"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfileCard({
  image,
  name,
  username,
}: {
  image: string;
  name: string;
  username: string;
}) {
  const nameInitials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const router = useRouter();
  return (
    <div>
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-2xl">
          <DropdownMenuSeparator />
          {username ? (
            <Link href={`/${username}`}>
              <DropdownMenuItem>Profilim</DropdownMenuItem>
            </Link>
          ) : (
            <Link href="/ayarlar">
              <DropdownMenuItem>Profil Oluştur</DropdownMenuItem>
            </Link>
          )}

          <Link href="/ayarlar">
            <DropdownMenuItem>Ayarlar</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              const currentUrl = window.location.href;
              signOut({
                callbackUrl: currentUrl,
              });
            }}
          >
            Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileCard;
