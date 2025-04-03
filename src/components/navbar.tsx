"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, LogOut, UserIcon } from "lucide-react";
import ButtonLogout from "./buttonLogout";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false); // Novo estado para abrir/fechar conta no mobile
  const { data, status } = useSession();
  const params = useParams()

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href={"/home"}
          className="text-2xl font-semibold transition-all ease-initial duration-600"
        >
          AndruSocial
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link href="/home" className="hover:text-gray-400 transition">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400 transition">
                <span>Conta</span>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white text-black shadow-lg rounded-lg"
            >
              <DropdownMenuItem className=" transition p-2 rounded-md cursor-pointer bg-white text-black">
                <Button className="bg-white text-black cursor-pointer hover:bg-black hover:text-white">
                  <Link href={`/perfil/${data?.user?.name}`}>
                    <UserIcon className="w-4 h-4 mr-2  cursor-pointer" />
                    Meu Perfil
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition p-2 rounded-md ">
                <Button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black shadow-md transition duration-300 hover:bg-black hover:text-white cursor-pointer w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Botão Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-900 p-4 rounded-lg shadow-md space-y-3">
          <Link
            href="/home"
            className="block hover:text-gray-400 transition p-2"
          >
            Home
          </Link>

          {/* Conta - Versão Mobile */}
          <div className="border-t border-gray-700 pt-2">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center justify-between w-full text-left p-2 hover:text-gray-400 transition"
            >
              <span>Conta</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isAccountOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isAccountOpen && (
              <div className="mt-2 space-y-2 bg-gray-800 p-2 rounded-md">
                <Link
                  href={`/perfil/${data?.user?.email}`}
                  className="flex items-center gap-2 hover:text-gray-400 transition"
                >
                  <UserIcon className="w-4 h-4 cursor-pointer" />
                  Meu Perfil
                </Link>
                <div className="flex items-center gap-2 cursor-pointer">
                  <ButtonLogout />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
