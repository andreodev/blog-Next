"use client";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export default function LoginRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="antialiased">
      <SessionProvider>
        <Analytics />
        {children}
        </SessionProvider>
    </div>
  );
}
