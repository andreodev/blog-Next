import Info from "@/components/info";
import Navbar from "./components/navbar";
import Image from "next/image";
import headerImage from "../images/Group 17.png";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <header>
        <Info />
        <Navbar />
      </header>
      <div className="flex justify-center items-center p-6">
        <div className="w-7xl relative">
          <Image
            src={headerImage}
            alt="Image"
            className="object-cover w-full rounded-md"
          />
          <h1 className="absolute top-1/3 left-1/5 transform -translate-x-1/2 -translate-y-1/2 w-[398px] text-4xl font-light text-[#454444]">
            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.
          </h1>
          <Button 
          className="absolute top-1/2 left-1/7 p-6 w-[191px] cursor-pointer rounded-2xl transform -translate-x-1/2 -translate-y-1/2 mt-16 bg-[#454444] font-bold text-lg">
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}
