import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getUserId from "@/app/utils/getUserId";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Kullanıcı adı gerekli")
    .min(3, "En az 3 karakter olmalı"),
  github: Yup.string().url("Geçerli bir GitHub URL'si girin").nullable(),
  twitter: Yup.string().url("Geçerli bir Twitter URL'si girin").nullable(),
  linkedin: Yup.string().url("Geçerli bir LinkedIn URL'si girin").nullable(),
  website: Yup.string().url("Geçerli bir URL girin").nullable(),
  bio: Yup.string()
    .max(350, "Biyografi en fazla 350 karakter olabilir")
    .nullable(),
  isVisible: Yup.boolean(),
  isAccept: Yup.boolean(),
});

async function validateUserData(data: any) {
  try {
    await validationSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce((acc: Record<string, string>, curr) => {
        if (curr.path) {
          acc[curr.path] = curr.message;
        }
        return acc;
      }, {});
      return { isValid: false, errors };
    }
    throw error;
  }
}

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

    // Validate user data
    const { isValid, errors } = await validateUserData(data);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

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
