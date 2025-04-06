"use client";

import { AppSidebar } from "@/components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

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

export default function HomeRoot({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`antialiased ${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <SessionProvider >
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <Toaster position="top-right" />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full px-4">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
