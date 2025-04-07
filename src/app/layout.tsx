import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Escolha os pesos necessários
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  console.log("Bem vindo Dev Curioso ");
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
