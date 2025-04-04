"use client";

import { useState } from "react";
import {
  LogOut,
  UserIcon,
  Menu,
  HomeIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import clsx from "clsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Inicia fechado no mobile
  const { data } = useSession();

  return (
    <>
      {/* Botão de abrir sidebar no mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden  top-4 left-4 bg-gray-900 text-white rounded-md shadow-md"
      >
        <Menu />
      </button>

      {/* Overlay no mobile quando sidebar está aberta */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-gray-900 text-white fixed top-0 left-0 h-full z-50 p-6 flex flex-col justify-between transition-all duration-300",
          isOpen ? "w-64" : "w-0 overflow-hidden",
          "md:w-64 md:static md:h-auto md:flex"
        )}
      >
        <div className="space-y-6">
          {/* Logo */}
          <Link
            href="/home"
            className="text-2xl font-bold block hover:text-gray-400"
          >
            Viewreo
          </Link>

          {/* Navegação */}
          <nav className="pl-2 space-y-2">
            <Link
              href="/home"
              className="flex items-center gap-2 py-2 hover:text-gray-400"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link
              href={`/perfil/${data?.user?.name}`}
              className="flex items-center gap-2 py-2 hover:text-gray-400"
            >
              <UserIcon className="w-4 h-4" />
              Meu Perfil
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 py-2 hover:text-gray-400 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        </div>

        {/* Rodapé */}
        <div className="text-sm text-gray-400 mt-6 hidden md:block">
          © {new Date().getFullYear()} Viewreo.v1.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
