"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInWithGithub() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        const currentUrl = window.location.href;
        signIn("github", { callbackUrl: currentUrl });
      }}
      type="submit"
      className="rounded-none"
    >
      Giriş Yap <Github className="w-4 h-4 ml-2" />
    </Button>
  );
}
