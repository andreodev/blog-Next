"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CogIcon, UserIcon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-semibold">Blogzito</div>

        <div className="hidden md:flex space-x-6">
          <a href="/home" className="hover:text-gray-400">
            Home
          </a>
          <a href="#footer" className="hover:text-gray-400">
            Sobre
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contato
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>Conta</span>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <UserIcon className="w-4 h-4 mr-2" />
                <a href="/perfil">Meu Perfil</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CogIcon className="w-4 h-4 mr-2" />
                Configurações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <a href="/" className="block hover:text-gray-400">
            Home
          </a>
          <a href="/about" className="block hover:text-gray-400">
            Sobre
          </a>
          <a href="/contact" className="block hover:text-gray-400">
            Contato
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
