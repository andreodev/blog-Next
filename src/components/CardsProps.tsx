"use client";

import type { StaticImageData } from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface TPCardProps {
  name: string;
  price: string;
  imageUrl: StaticImageData;
}

export default function CardsProps({ name, imageUrl }: TPCardProps) {
  return (
    <Card className="w-full max-w-3xs border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6">
      <CardContent className="flex flex-col items-center">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="rounded-lg object-cover"
        />
        <h2 className="text-lg max-w-44 font-normal mt-3">{name}</h2>
      </CardContent>
      <CardFooter className="p-4 flex justify-between w-full">
        <Button variant="default" className="w-1/3">
          Editar
        </Button>
        <Button variant="destructive" className="w-1/3">
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
