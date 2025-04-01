"use client";

import { useUsers } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserDto } from "./DTO/useDTO";

interface Props {
  params: {
    email: string;
  };
}

export default function Profile({ params }: Props) {
  const { users, error } = useUsers();
  const [filteredUser, setFilteredUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (users && users.length > 0 && params.email) {
      const userPosts = users.filter((userItem) => userItem.email === params.email);
      setFilteredUser(userPosts.length > 0 ? userPosts[0] : null);
    }
  }, [users, params.email]);

  if (!filteredUser) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="relative">
        <Image
          width={100}
          height={10}
          src={
            filteredUser.banner ||
            "https://i.pinimg.com/736x/f1/4c/4c/f14c4c88a836ec9c5f79d313e0d8cd7d.jpg"
          }
          alt="Banner"
          className="w-full h-32 object-cover rounded-t-lg"
          priority
        />
        {/* Imagem do perfil flutuante */}
        <div className="absolute left-4 bottom-[-20px]">
          <Image
            width={100}
            height={100}
            src={
              filteredUser.image ||
              "https://i.pinimg.com/736x/f1/4c/4c/f14c4c88a836ec9c5f79d313e0d8cd7d.jpg"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white"
            priority
          />
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-semibold text-gray-800">{filteredUser.name}</h1>
        <p className="text-sm text-gray-600">@{filteredUser.nameUser}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium text-gray-800">Sobre</h2>
        <p className="text-gray-600 text-sm">{filteredUser.bio || "Sem bio"}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium text-gray-800">Localização</h2>
        <p className="text-gray-600 text-sm">
          {filteredUser.location || "Localização não fornecida"}
        </p>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm">
          Editar Perfil
        </button>
        <button className="px-4 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 text-sm">
          Ver Posts
        </button>
      </div>
    </div>
  );
}
