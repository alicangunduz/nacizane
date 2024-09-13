import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import getUserId from "@/app/utils/getUserId";

export async function DELETE(req: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { feedbackId } = await req.json();

    if (!feedbackId) {
      return NextResponse.json(
        { error: "Feedback ID is required." },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.findFirst({
      where: { id: feedbackId, userId, isDeleted: false },
    });
    if (!feedback) {
      return NextResponse.json(
        { success: false, message: "Feedback not found" },
        { status: 404 }
      );
    }

    if (feedback.userId !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not have feedback id for this user",
        },
        { status: 403 }
      );
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: { isDeleted: true },
    });

    return NextResponse.json({ success: true, feedback: updatedFeedback });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting feedback." },
      { status: 500 }
    );
  }
}
