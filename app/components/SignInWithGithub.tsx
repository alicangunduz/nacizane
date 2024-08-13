"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInWithGithub() {
  return (
    <Button
      onClick={() =>
        signIn("github", { callbackUrl: `http://localhost:3000/` })
      }
      type="submit"
      className=""
    >
      Giriş Yap <Github className="w-4 h-4 ml-2" />
    </Button>
  );
}
