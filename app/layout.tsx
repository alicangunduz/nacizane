import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/landingPage/Header";
import Footer from "./components/landingPage/Footer";
import Announcement from "./components/landingPage/Announcement";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nacizane.co",
  description:
    "Nacizane.co , anonim olarak geri bildirim vermenizi sağlayan bir uygulama. İnsanların birbirlerine dürüst ve yapıcı geri bildirimlerde bulunmalarını kolaylaştırır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <div className="flex flex-col min-h-[100dvh]">
          <Announcement />
          <Header />
          <main className="flex-1">{children}</main> <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
