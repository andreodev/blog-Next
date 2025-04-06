"use client";

import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderProps {
  text: string;
  buttonText: string;
  imageSrc: string | StaticImageData;
}

export default function HeaderProps({
  text,
  imageSrc,
  buttonText,
}: HeaderProps) {
  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo */}
      <Image
        src={imageSrc}
        alt="Banner"
        fill
        quality={100}
        className="absolute top-0 left-0 w-full h-full object-cover scale-110 hover:scale-100 blur-[1px] transition-transform duration-[2000ms] ease-out"
        priority
      />

      {/* Gradiente animado */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-black/30 animate-pulse" />

      {/* Ícone decorativo animado */}
      <motion.div
        className="absolute top-10 right-10 text-white opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
      </motion.div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          <Link href={"#Post"}>{text}</Link>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button className="mt-6 px-6 py-3 text-lg font-semibold rounded-lg  transition-all hover:scale-105">
            <Link href="/login">{buttonText}</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
