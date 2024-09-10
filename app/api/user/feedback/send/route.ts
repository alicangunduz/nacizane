import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { randomAuthorName } from "@/lib/randomAuthorName";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function checkModeration(feedback: string) {
  const prompt = `Sana aşağıda tırnaklar içerisinde bir eleştiri cümlesi vereceğim bu cümle iyi veya kötü eleştiri olabilir fakat bunu moderasyonunu sağlaman lazım. Bu cümle T.C kanunları kapsamında hakaret kesinlikle içermemeli , ağır aşağılama içermemeli. Kontrol sonrasında bana sadece json formatında şu şekilde dönüş sağla:
{
  "moderated": true
}
Moderasyonundan geçti ise true geçmedi ise false dön.
İşte eleştiri metni:"${feedback}"`;

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const result = await chatSession.sendMessage(feedback);
  const moderationResult = JSON.parse(result.response.text());

  return moderationResult.moderated;
}

export async function POST(req: Request) {
  const randAuthorName =
    randomAuthorName[Math.floor(Math.random() * randomAuthorName.length)];
  try {
    const { feedback, userId, authorId } = await req.json();

    // Ban kontrolü
    const ban = await prisma.ban.findUnique({
      where: { userId },
    });

    if (ban && new Date() < new Date(ban.bannedUntil)) {
      return NextResponse.json(
        { message: "Çok fazla geri bildirim gönderdiniz. 10 dakika bekleyin." },
        { status: 403 }
      );
    }

    // Son 1 dakikadaki logları kontrol et (başarılı ve başarısız toplamı)
    const oneMinuteAgo = new Date(new Date().getTime() - 60 * 1000);
    const recentLogs = await prisma.feedbackLog.count({
      where: {
        userId,
        createdAt: {
          gte: oneMinuteAgo,
        },
      },
    });

    // Eğer kullanıcı son 1 dakika içinde 5 denemeye ulaşmışsa 10 dakika ban uygula
    if (recentLogs >= 5) {
      await prisma.ban.upsert({
        where: { userId },
        update: {
          bannedUntil: new Date(new Date().getTime() + 10 * 60 * 1000),
        },
        create: {
          userId,
          bannedUntil: new Date(new Date().getTime() + 10 * 60 * 1000),
        },
      });

      return NextResponse.json(
        { message: "Çok fazla geri bildirim gönderdiniz. 10 dakika bekleyin." },
        { status: 403 }
      );
    }

    // Moderasyon kontrolü
    const isModerated = await checkModeration(feedback);
    if (!isModerated) {
      // Başarısız geri bildirim girişimini logla
      await prisma.feedbackLog.create({
        data: {
          userId,
        },
      });

      return NextResponse.json(
        { message: "Geri bildirim moderasyondan geçmedi." },
        { status: 400 }
      );
    }

    // Başarılı geri bildirimi kaydet
    await prisma.feedback.create({
      data: {
        feedback,
        userId,
        authorId,
        randomAuthorName: randAuthorName,
      },
    });

    // Başarılı geri bildirimi logla
    await prisma.feedbackLog.create({
      data: {
        userId,
      },
    });

    return NextResponse.json(
      { message: "Geri bildirim başarıyla kaydedildi." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating feedback", error);
    return NextResponse.json(
      { error: "Geri bildirim kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
