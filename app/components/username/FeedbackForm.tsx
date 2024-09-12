"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa6";

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
  const [isLoading, setIsLoading] = useState(false); // isLoading state

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true); // Set loading to true when submitting
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
        } else if (
          data.message ===
          "Çok fazla geri bildirim gönderdiniz. 10 dakika bekleyin."
        ) {
          toast({
            title: "Çok fazla istek",
            description:
              "Çok fazla geri bildirim gönderdiniz. Lütfen 10 dakika bekleyin.",
            variant: "warning",
          });
        } else if (
          data.message ===
          "Bir kullanıcıya en fazla 3 geri bildirim verebilirsiniz."
        ) {
          toast({
            title: "Geri bildirim limiti",
            description:
              "Bir kullanıcıya en fazla 3 geri bildirim verebilirsiniz.",
            variant: "warning",
          });
        } else {
          toast({
            title: "Hata",
            description:
              "Geri bildirim kaydedilirken bir hata oluştu. Lütfen tekrar deneyin. Muhtemelen yapay zeka çıktısı doğru şekilde alınamadı.",
            variant: "destructive",
          });
          console.error("Error submitting feedback");
        }
      } catch (error) {
        toast({
          title: "Hata",
          description:
            "Geri bildirim kaydedilirken bir hata oluştu. Lütfen tekrar deneyin. Muhtemelen yapay zeka çıktısı doğru şekilde alınamadı.",
          variant: "destructive",
        });
        console.error("Error submitting feedback", error);
      } finally {
        setIsLoading(false); // Set loading to false after request is done
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
          disabled={isLoading} // Disable textarea when loading
        />
        {formik.touched.comment && formik.errors.comment ? (
          <p className="text-red-500">{formik.errors.comment}</p>
        ) : null}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary rounded-2xl"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" />{" "}
              Gönderiliyor...
            </>
          ) : (
            "Gönder"
          )}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
