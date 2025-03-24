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
    <Card className="w-full max-w-3xs bord  er rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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
      <CardFooter className="p-4 flex justify-center">
        <Button variant="default" className="w-full">
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
