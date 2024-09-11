import { redirect } from "next/navigation";
import prisma from "@/app/utils/db";
import getUserId from "@/app/utils/getUserId";
import ProfileForm from "@/app/components/ProfileForm";

async function getUser() {
  const userId = await getUserId();
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export default async function Profilim() {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-4xl">
          {!user.username && (
            <div
              className="p-4 mb-8 text-sm text-primary-foreground rounded-2xl bg-primary border"
              role="alert"
            >
              <span className="font-bold">Bilgi: </span> Profilinizi paylaşmak
              için bir kullanıcı adı belirlemeniz gerekir.
            </div>
          )}
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
