import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import prisma from "@/app/utils/db";
import getUserId from "@/app/utils/getUserId";
import { notFound } from "next/navigation";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaGlobeAmericas,
} from "react-icons/fa";
import SignInWithGithub from "@/app/components/SignInWithGithub";
import FeedbackForm from "@/app/components/username/FeedbackForm";
import FeedbackComment from "@/app/components/username/FeedbackComment";

interface Params {
  params: {
    username: string;
  };
}

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

export default async function UserPage({ params }: Params) {
  const loggedInUserId = await getUser();
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (loggedInUserId?.isVisible === false) {
    return notFound();
  }

  if (!user) {
    notFound();
  }

  const ReceivedFeedback = await prisma.feedback.findMany({
    where: {
      userId: user.id,
    },
  });

  const isOwner = loggedInUserId?.username === user?.username;

  if (loggedInUserId?.username === user?.username) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <div className="flex items-center gap-6">
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
            <div className="grid gap-2">
              <div className="text-2xl font-bold">{user.name}</div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {user.twitter && (
                  <Link
                    href={user.twitter}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaTwitter className="h-5 w-5" />
                  </Link>
                )}
                {user.github && (
                  <Link
                    href={user.github}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaGithub className="h-5 w-5" />
                  </Link>
                )}
                {user.linkedin && (
                  <Link
                    href={user.linkedin}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                )}
                {user.website && (
                  <Link
                    href={user.website}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaGlobeAmericas className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="text-muted-foreground">{user.bio}</div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-6">
              <FeedbackComment
                ReceivedFeedback={ReceivedFeedback}
                isOwner={isOwner}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {loggedInUserId === null ? null : loggedInUserId.username === null ? (
            <Link href="/ayarlar">
              <div className="p-4 mb-8 text-sm text-primary-foreground rounded-2xl bg-primary border">
                <span className="font-bold">Bilgi: </span> Sende geri bildirim
                almak istiyorsan hemen buraya tıkla kullanıcı adını belirle ve
                profilini paylaş!
              </div>
            </Link>
          ) : null}
          <div className="flex items-center gap-6">
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
            <div className="grid gap-2">
              <div className="text-2xl font-bold">{user.name}</div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {user.twitter && (
                  <Link
                    href={user.twitter}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaTwitter className="h-5 w-5" />
                  </Link>
                )}
                {user.github && (
                  <Link
                    href={user.github}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaGithub className="h-5 w-5" />
                  </Link>
                )}
                {user.linkedin && (
                  <Link
                    href={user.linkedin}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                )}
                {user.website && (
                  <Link
                    href={user.website}
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <FaGlobeAmericas className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="text-muted-foreground">{user.bio}</div>
          </div>
          <Separator />
          <div className="grid gap-4">
            {user.isAccept === true ? (
              loggedInUserId === null ? (
                <>
                  <p className="text-muted-foreground text-center">
                    Geri bildirim vermek için giriş yapmalısınız.
                  </p>
                  <SignInWithGithub />
                </>
              ) : (
                <>
                  <FeedbackForm userId={user.id} authorId={loggedInUserId.id} />
                  <Separator />
                </>
              )
            ) : null}

            <div className="grid gap-6">
              <FeedbackComment
                ReceivedFeedback={ReceivedFeedback}
                isOwner={isOwner}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
