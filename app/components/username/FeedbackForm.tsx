"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Yorum alanı boş bırakılamaz.")
    .min(10, "Yorum alanı en az 10 karakter olmalıdır.")
    .max(500, "Yorum alanı en fazla 500 karakter olabilir."),
});

interface FeedbackFormProps {
  userId: string;
  authorId: string;
}

const FeedbackForm = ({ userId, authorId }: FeedbackFormProps) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/api/user/feedback/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feedback: values.comment,
            userId,
            authorId,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          resetForm();
          toast({
            title: "Teşekküreler",
            description: "Geri bildiriminiz başarıyla gönderildi!",
            variant: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (data.message === "Geri bildirim moderasyondan geçmedi.") {
          toast({
            title: "Hata",
            description:
              "Geri bildirim moderasyondan geçemedi. Lütfen daha yapıcı bir geri bildirim yazın.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Hata",
            description: "Geri bildirim gönderilirken bir hata oluştu.",
            variant: "destructive",
          });
          console.error("Error submitting feedback");
        }
      } catch (error) {
        toast({
          title: "Hata",
          description: "Geri bildirim gönderilirken bir hata oluştu.",
          variant: "destructive",
        });
        console.error("Error submitting feedback", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Yapıcı geri bildirimini yaz."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          className="min-h-[100px] rounded-2xl"
        />
        {formik.touched.comment && formik.errors.comment ? (
          <p className="text-red-500">{formik.errors.comment}</p>
        ) : null}
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-primary rounded-2xl">
          Gönder
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
