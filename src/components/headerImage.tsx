"use client"

import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  text: string;
  buttonText: string;
  imageSrc: StaticImageData;
}

export default function Header({ text, imageSrc, buttonText }: HeaderProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[720px] flex items-center justify-center">
      <Image
        src={imageSrc}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{text}</h1>
        <Button className="mt-4 px-6 py-3 text-lg">{buttonText}</Button>
      </div>
    </div>
  );
}
