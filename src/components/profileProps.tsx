"use client";

import { useUsers } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserDto } from "./DTO/useDTO";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";

export default function Profile() {
  const params = useParams();
  const userName = params?.userName as string | undefined;

  const { users, error } = useUsers();
  const { data: session } = useSession();
  const [filteredUser, setFilteredUser] = useState<UserDto | null>(null);

  // 🔍 DEBUG: Verificar valores iniciais

  useEffect(() => {
    if (!users || users.length === 0) return; // Se `users` estiver vazio, não faz nada
    if (!userName) return; // Se `userName` não existir, não faz nada

    const userFound = users.find((user) => user.userName === userName);

    if (userFound) {
      setFilteredUser(userFound);
    } else {
      setFilteredUser(null);
    }
  }, [users, userName]);

  if (!userName) {
    return (
      <div className="text-red-500">Erro: Nome de usuário não encontrado.</div>
    );
  }

  if (error) {
    console.log("❌ Erro ao buscar usuários:", error);
    return <div className="text-red-500">Erro ao carregar usuário.</div>;
  }

  if (!filteredUser) {
    return <div className="text-center text-gray-500">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-md">
      <div className="relative">
        <Image
          width={800}
          height={200}
          src={
            filteredUser.banner ||
            "https://i.pinimg.com/736x/f1/4c/4c/f14c4c88a836ec9c5f79d313e0d8cd7d.jpg"
          }
          alt="Banner"
          className="w-full h-56 object-cover rounded-t-lg"
          priority
        />

        <div className="absolute left-4 bottom-[-20px]">
          <Image
            width={100}
            height={100}
            src={
              filteredUser.image ||
              "https://i.pinimg.com/736x/f1/4c/4c/f14c4c88a836ec9c5f79d313e0d8cd7d.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white"
            priority
          />
        </div>
      </div>

      <div className=" p-6 space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800">
            {filteredUser.name}
          </h1>
          <p className="text-sm text-gray-600">@{filteredUser.userName}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-800">Sobre</h2>
            <p className="text-sm text-gray-600">
              {filteredUser.bio || "Sem bio"}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800">Localização</h2>
            <p className="text-sm text-gray-600">
              {filteredUser.location || "Localização não fornecida"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-3 p-2">
        {filteredUser.name === session?.user?.name && (
          <Button className="bg-black">Editar Perfil</Button>
        )}
      </div>
    </div>
  );
}
