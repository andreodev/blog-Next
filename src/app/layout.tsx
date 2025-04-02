import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";



const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Escolha os pesos necessários
});

export const metadata: Metadata = {
  title: "Blog Pessoal",
  description: "Desenvolvido por Andreo Henrique.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  console.log("Bem vindo Dev Curioso ");
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
