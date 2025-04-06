"use client";

import { useUsers } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserDto } from "./DTO/useDTO";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import ConfigProfile from "./profileEditModal";

export default function Profile() {
  const params = useParams();
  const userName = params?.userName as string | undefined;

  const { users, error } = useUsers();
  const { data: session } = useSession();
  const [filteredUser, setFilteredUser] = useState<UserDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!users || users.length === 0) return;
    if (!userName) return;

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-md bg-[#f5e9e9]">
      <div className="relative">
        <Image
          width={800}
          height={200}
          src={
            filteredUser.banner ||
            "https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg"
          }
          alt="Banner"
          className="w-full h-56 object-cover"
          priority
        />

        <div className="absolute left-4 bottom-[-20px]">
          <Image
            width={100}
            height={100}
            src={
              filteredUser.image ||
              "https://i.pinimg.com/736x/a3/cf/ce/a3cfce855a833b760b5a8cc34a1f4cd1.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-black"
            priority
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
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

        {/* Mostrar botão de editar somente se for o dono */}
        {session?.user?.email === filteredUser.email && (
          <>
            <Button
              onClick={() => {
                handleOpenModal();
              }}
              className="cursor-pointer p-2"
            >
              Configurar Perfil
            </Button>
            

            {showModal && (
              <ConfigProfile
                user={filteredUser}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
