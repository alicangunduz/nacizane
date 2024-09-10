import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getUserId from "@/app/utils/getUserId";

export async function PUT(req: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const data = await req.json();

    const {
      username,
      twitter,
      github,
      linkedin,
      website,
      bio,
      isVisible,
      isAccept,
    } = data;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== userId) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        twitter,
        github,
        linkedin,
        website,
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
