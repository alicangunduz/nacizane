import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";

export async function POST(req: Request) {
  try {
    const { feedbackId } = await req.json();

    if (!feedbackId) {
      return NextResponse.json(
        { error: "Feedback ID is required." },
        { status: 400 }
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
