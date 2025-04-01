"use client";

import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  text: string;
  buttonText: string;
  imageSrc: StaticImageData;
}

export default function Header({ text, imageSrc, buttonText }: HeaderProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[720px] flex items-center justify-center">
      {/* Imagem de fundo */}
      <Image
        src={imageSrc}
        alt="Banner"
        fill
        quality={90}
        className="absolute top-0 left-0 w-full h-full object-cover"
        priority
      />

      {/* Sobreposição escura */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Conteúdo do Header */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="text-2xl md:text-4xl lg:text-5xl font-bold transition-all duration-500 ease-in-out transform hover:scale-105">

        <Link href={"#Post"}>
          {text}
        </Link>
        </div>
        <Button className="mt-4 px-6 py-3 text-lg transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 hover:scale-105">
          <Link href="#Post" className="block w-full">
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
