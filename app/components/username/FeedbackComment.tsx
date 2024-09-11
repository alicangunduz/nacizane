"use client";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaShare, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type FeedbackCommentProps = {
  ReceivedFeedback: any;
  isOwner: boolean;
};

function FeedbackComment({ ReceivedFeedback, isOwner }: FeedbackCommentProps) {
  const { toast } = useToast();

  const [feedbacks, setFeedbacks] = useState(
    ReceivedFeedback.filter((feedback: any) => !feedback.isDeleted).sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) || []
  );

  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(5);

  async function handleDeleteFeedback(id: any) {
    try {
      const res = await fetch("/api/user/feedback/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbackId: id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete feedback");
      }

      const data = await res.json();

      setFeedbacks((prevFeedbacks: any) =>
        prevFeedbacks.filter((feedback: any) => feedback.id !== id)
      );

      toast({
        title: "Başarılı!",
        description: "Geri bildirim başarıyla silindi.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Geri bildirim silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {feedbacks.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          Henüz geri bildirim yok.
        </div>
      )}
      {feedbacks.slice(0, visibleFeedbackCount).map((feedback: any) => (
        <div key={feedback.id} className="flex items-start gap-4 text-sm mt-3">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/nacizane-profil.png" alt="@nacizane" />
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{feedback.randomAuthorName}</div>
              <div className="text-xs text-muted-foreground">
                {(() => {
                  const now = new Date();
                  const createdAt = new Date(feedback.createdAt);
                  const diff = now.getTime() - createdAt.getTime();
                  const diffMinutes = diff / (1000 * 60);
                  const diffHours = diffMinutes / 60;

                  if (diffMinutes < 60) {
                    return `${Math.floor(diffMinutes)} dakika önce`;
                  } else if (diffHours < 24) {
                    return `${Math.floor(diffHours)} saat önce`;
                  } else {
                    return createdAt.toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }
                })()}
              </div>
            </div>
            <div>{feedback.feedback}</div>
            {isOwner && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                  onClick={() => handleDeleteFeedback(feedback.id)}
                >
                  <FaTrashAlt className="w-4 h-4" />
                  <span className="sr-only">Sil</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
      {feedbacks.length > visibleFeedbackCount && (
        <div className="text-center mt-4">
          <Button
            onClick={() => setVisibleFeedbackCount(visibleFeedbackCount + 5)}
            className="rounded-2xl"
          >
            Daha fazla göster
          </Button>
        </div>
      )}
    </>
  );
}

export default FeedbackComment;
