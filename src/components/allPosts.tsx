"use client";

import { usePosts, useUsers } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react"; // Adicionar a verificação da sessão
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Usado para redirecionar

export default function AllPosts() {
  const { post, error: postsError } = usePosts();
  const { users, error: usersError } = useUsers();
  const { data: session, status } = useSession(); // Verificar a sessão do usuário
  const [postsWithUserInfo, setPostsWithUserInfo] = useState<{
    id: string;
    userEmail: string;
    userName: string;
    userImage: string;
    createdAt: string;
    title: string;
    content: string;
    image?: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const router = useRouter(); // Instanciar o hook de navegação

  useEffect(() => {
    // Verificar se o usuário está logado antes de fazer a requisição
    if (status === "unauthenticated") {
      // Se não estiver autenticado, redirecionar para a página de login
      router.push("/login");
    }

    if (post?.length && users?.length) {
      const postsWithUser = post.map((postItem) => {
        const user = users.find((userItem) => userItem.email === postItem.userEmail);
        return {
          ...postItem,
          userName: user?.name || "Desconhecido",
          userImage: user?.image || "https://i.pinimg.com/736x/8a/9f/ac/8a9fac6159e698818b553eac700e4a57.jpg",
        };
      });
      setPostsWithUserInfo(postsWithUser);
      setIsLoading(false); // Marcar como carregado
    }
  }, [post, users, status, router]);

  if (isLoading) {
    return <p>Carregando...</p>; // Exibir mensagem enquanto os dados estão sendo carregados
  }

  if (postsError || usersError) {
    console.error("Erro:", postsError || usersError);
    return <p>Ocorreu um erro ao carregar os posts.</p>; // Exibir mensagem de erro
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg space-y-6">
      {postsWithUserInfo.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum post disponível.</p>
      ) : (
        postsWithUserInfo.map((postItem) => (
          <div key={postItem.id} id="Post" className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <Image
                src={postItem.userImage}
                alt={postItem.userName}
                width={50}
                height={50}
                className="rounded-full border"
              />
              <div>
                <Link href={`/perfil/${postItem.userEmail}`} className="text-blue-600 font-semibold hover:underline">
                  {postItem.userName}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(postItem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{postItem.title}</h2>
              <p className="text-gray-700">{postItem.content}</p>
              {postItem.image && (
                <div className="mt-2">
                  <Image
                    src={postItem.image}
                    alt="Post Image"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
