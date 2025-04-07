"use client";

import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Blog Pessoal",
  description: "Desenvolvido por Andreo Henrique, um espaço para compartilhar conhecimentos sobre desenvolvimento, tecnologia e programação.",
  keywords: "blog, desenvolvimento, tecnologia, programação, Andreo Henrique, dev, curiosidades, dicas de código",
  authors: [{ name: "Andreo Henrique" }],
  robots: "index, follow",
  openGraph: {
    title: "Blog Pessoal de Andreo Henrique",
    description: "Um blog dedicado a temas como desenvolvimento de software, programação, e mais.",
    url: "https://blog-viewreo.vercel.app/",  // Altere para o URL do seu blog
    images: ['/assets/pj5.png'], // Adicione uma imagem para o Open Graph
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@andreodev", // Alterar para seu Twitter se necessário
    title: "Blog Pessoal de Andreo Henrique",
    description: "Desenvolvido por Andreo Henrique, um espaço para compartilhar conhecimentos sobre desenvolvimento, tecnologia e programação.",
    images: ['/assets/pj5.png'], // Imagem para Twitter Card
  },
};

export default function RegisterRoot({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`antialiased ${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <SessionProvider >
          <Toaster position="top-right" />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full px-4">
              <Analytics />
              {children}
            </div>
          </main>
      </SessionProvider>
    </div>
  );
}
