"use client";

import { usePosts, useUsers } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AllPosts() {
  const { data } = useSession();
  const { post, error } = usePosts();
  const { users } = useUsers();
  const [postsWithUserInfo, setPostsWithUserInfo] = useState<
    {
      id: string;
      title: string;
      content: string;
      createdAt: string;
      userEmail: string;
      userName: string;
      userImage: string;
    }[]
  >([]);

  useEffect(() => {
    if (post && post.length > 0 && users && users.length > 0) {
      // Associando cada post ao nome e imagem do usuário
      const postsWithUser = post.map((postItem) => {
        const user = users.find((userItem) => userItem.email === postItem.userEmail);
        return {
          ...postItem,
          userName: user?.name || "Desconhecido",
          userImage: user?.image || "https://i.pinimg.com/736x/8a/9f/ac/8a9fac6159e698818b553eac700e4a57.jpg",
        };
      });
      setPostsWithUserInfo(postsWithUser);
    }
  }, [post, users]);

  if (error) {
    console.error("Erro:", error);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {postsWithUserInfo.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum post disponível.</p>
      ) : (
        postsWithUserInfo.map((postItem) => (
          <div key={postItem.id} className="mb-6">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <Image
                src={postItem.userImage}
                alt={postItem.userName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                {/* Nome do usuário */}
                <p className="font-semibold text-gray-800">{postItem.userName}</p>
                {/* Data de criação do post */}
                <p className="text-sm text-gray-500">
                  {new Date(postItem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-4">
              {/* Conteúdo do post */}
              <h2 className="text-lg font-semibold text-gray-800">{postItem.title}</h2>
              <p className="text-gray-600">{postItem.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
