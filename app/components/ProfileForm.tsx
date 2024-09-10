"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Kullanıcı adı gerekli")
    .min(3, "En az 3 karakter olmalı"),
  github: Yup.string().url("Geçerli bir GitHub URL'si girin"),
  twitter: Yup.string().url("Geçerli bir Twitter URL'si girin"),
  linkedin: Yup.string().url("Geçerli bir LinkedIn URL'si girin"),
  website: Yup.string().url("Geçerli bir URL girin"),
  bio: Yup.string().max(350, "Biyografi en fazla 350 karakter olabilir"),
  isVisible: Yup.boolean(),
  isAccept: Yup.boolean(),
});

export default function ProfileForm({ user }: { user: any }) {
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      github: user?.github || "",
      twitter: user?.twitter || "",
      linkedin: user?.linkedin || "",
      website: user?.website || "",
      bio: user?.bio || "",
      isVisible: user?.isVisible ?? true,
      isAccept: user?.isAccept ?? true,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const trimmedValues = {
          username: values.username.trim().toLowerCase(),
          github: values.github.trim().toLowerCase(),
          twitter: values.twitter.trim().toLowerCase(),
          linkedin: values.linkedin.trim().toLowerCase(),
          website: values.website.trim().toLowerCase(),
          bio: values.bio.trim(),
          isVisible: values.isVisible,
          isAccept: values.isAccept,
        };

        if (!trimmedValues.username) {
          toast({
            title: "Hata",
            description: "Kullanıcı adı boş bırakılamaz.",
            variant: "destructive",
          });
          setSubmitting(false);
          return;
        }

        const response = await fetch("/api/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trimmedValues),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: "Değişikler Kayıt Edildi",
            description: "Profiliniz sorunsuz güncellendi.",
            variant: "success",
          });
          window.location.reload();
        } else {
          if (result.message === "Username is already taken") {
            toast({
              title: "Kullanıcı Adı Kullanımda",
              description:
                "Bu kullanıcı adı zaten alınmış. Lütfen farklı bir kullanıcı adı seçin.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Hata",
              description: `Bir hata oluştu: ${result.message}`,
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        toast({
          title: "Hata",
          description: "Bir hata oluştu.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.image || ""} alt={user?.name || ""} />
          <AvatarFallback>
            {user.name
              ? user.name
                  .split(" ")
                  .map((name: string) => name[0])
                  .join("")
              : ""}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="flex text-2xl font-bold items-center">
            {user.name}{" "}
            {!user.username && (
              <Badge
                variant="outline"
                className="ml-2 bg-orange-500 py-1 px-4 text-white hidden md:block"
              >
                Kullanıcı adı belirleyin!
              </Badge>
            )}
          </h3>
          <p className="text-muted-foreground">{user.email}</p>
          {!user.username && (
            <Badge
              variant="outline"
              className="bg-orange-500 py-1 px-4 text-white md:hidden"
            >
              Kullanıcı adı belirleyin!
            </Badge>
          )}
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Kullanıcı Adı</Label>
          <Input
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.username && formik.errors.username
                ? "border-red-500 rounded-2xl"
                : "rounded-2xl"
            }
          />
          {formik.touched.username &&
            formik.errors.username &&
            typeof formik.errors.username === "string" && (
              <div className="text-red-500">{formik.errors.username}</div>
            )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="github">GitHub Link</Label>
          <Input
            id="github"
            name="github"
            value={formik.values.github}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.github && formik.errors.github
                ? "border-red-500 rounded-2xl"
                : "rounded-2xl"
            }
          />
          {formik.touched.github &&
            formik.errors.github &&
            typeof formik.errors.github === "string" && (
              <div className="text-red-500">{formik.errors.github}</div>
            )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="twitter">Twitter Link</Label>
          <Input
            id="twitter"
            name="twitter"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.twitter && formik.errors.twitter
                ? "border-red-500 rounded-2xl"
                : "rounded-2xl"
            }
          />
          {formik.touched.twitter &&
            formik.errors.twitter &&
            typeof formik.errors.twitter === "string" && (
              <div className="text-red-500">{formik.errors.twitter}</div>
            )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="linkedin">Linkedin Link</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formik.values.linkedin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.linkedin && formik.errors.linkedin
                ? "border-red-500 rounded-2xl"
                : "rounded-2xl"
            }
          />
          {formik.touched.linkedin &&
            formik.errors.linkedin &&
            typeof formik.errors.linkedin === "string" && (
              <div className="text-red-500">{formik.errors.linkedin}</div>
            )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="website">Web Site & Blog Link</Label>
          <Input
            id="website"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.website && formik.errors.website
                ? "border-red-500 rounded-2xl"
                : "rounded-2xl"
            }
          />
          {formik.touched.website &&
            formik.errors.website &&
            typeof formik.errors.website === "string" && (
              <div className="text-red-500">{formik.errors.website}</div>
            )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Biyografi</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.bio && formik.errors.bio
                ? "border-red-500 rounded-2xl"
                : "rounded-2xl"
            }
          />
          {formik.touched.bio &&
            formik.errors.bio &&
            typeof formik.errors.bio === "string" && (
              <div className="text-red-500">{formik.errors.bio}</div>
            )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="isAccept">Geri Bildirim Açık Olsun</Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="isAccept"
              name="isAccept"
              checked={formik.values.isAccept}
              onCheckedChange={(value: boolean) =>
                formik.setFieldValue("isAccept", value)
              }
              onBlur={formik.handleBlur}
              className="rounded-2xl"
            />

            <span className="text-muted-foreground">
              Hesabınız geri bildirim almak için açık olmalıdır.
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="isVisible">Hesabım Açık Olsun</Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="isVisible"
              name="isVisible"
              checked={formik.values.isVisible}
              onCheckedChange={(value: boolean) =>
                formik.setFieldValue("isVisible", value)
              }
              onBlur={formik.handleBlur}
              className="rounded-2xl"
            />

            <span className="text-muted-foreground">
              İnsanların profil adresiniz ile ziyaret edebilmesi için hesabınız
              açık olmalıdır.
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="rounded-2xl">
            Değişiklikleri Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
}
