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

    const isModerated = await checkModeration(feedback);
    if (!isModerated) {
      return NextResponse.json(
        { message: "Geri bildirim moderasyondan geçmedi." },
        { status: 400 }
      );
    }
    await prisma.feedback.create({
      data: {
        feedback,
        userId,
        authorId,
        randomAuthorName: randAuthorName,
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
