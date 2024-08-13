import Link from "next/link";
import Image from "next/image";
import SignInWithGithub from "@/app/components/SignInWithGithub";
import getUserId from "@/app/utils/getUserId";
import prisma from "@/app/utils/db";
import ProfileCard from "./ProfileCard";

const getUser = async () => {
  const userId = await getUserId();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      image: true,
      name: true,
    },
  });

  return user;
};

async function Header() {
  const userId = await getUserId();
  const image = (await getUser())?.image || "";
  const name = (await getUser())?.name || "";
  return (
    <header className=" mt-2 px-4 lg:px-6 h-14 flex items-center">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Image
          src="/nacizaneco.png"
          alt="Nacizane.co logosu, sol tarafta stilize bir konuşma balonu simgesi ve sağında kalın mavi harflerle yazılmış 'Nacizane.co' metni içeriyor."
          width={200}
          height={70}
          className="cursor-pointer "
        />
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {userId ? (
          <Link
            href=""
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            <ProfileCard image={image} name={name} />
          </Link>
        ) : (
          <>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Gizlilik Sözleşmesi
            </Link>
            <Link
              href=""
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              <SignInWithGithub />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
