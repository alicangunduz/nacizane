import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getUserId from "@/app/utils/getUserId";

// API rotası için PUT metodu kullanarak kullanıcı verilerini güncelliyoruz
export async function PUT(req: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // API'den gelen veriyi alıyoruz
    const data = await req.json();

    const { username, twitter, github, linkedin, bio, isVisible, isAccept } =
      data;

    // Kullanıcı adının benzersiz olup olmadığını kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== userId) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Veritabanında kullanıcıyı güncelle
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        twitter,
        github,
        linkedin,
        bio,
        isVisible,
        isAccept,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("User update failed:", error);
    return NextResponse.json(
      { success: false, message: "User update failed" },
      { status: 500 }
    );
  }
}
