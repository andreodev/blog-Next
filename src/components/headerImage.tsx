"use client";

import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  text: string;
  buttonText: string;
  imageSrc: string | StaticImageData;
}

export default function HeaderProps({ text, imageSrc, buttonText }: HeaderProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[720px] flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo */}
      <Image
        src={imageSrc}
        alt="Banner"
        fill
        quality={100}
        className="absolute top-0 left-0 w-full h-full object-cover scale-110 transition-transform duration-500 hover:scale-100"
        priority
      />

      {/* Gradiente animado */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-black/40 animate-gradient" />

      {/* Conteúdo */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg transition-all duration-500 hover:scale-105">
          <Link href={"#Post"}>{text}</Link>
        </h1>
        
        <Button className="mt-6 px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-500/50 transition-all duration-300">
          <Link href="/login">{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
