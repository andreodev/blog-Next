"use client";

import { usePosts, useUsers } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewPost from "@/components/newPost"; // Importa o formulário de criação de post

export default function AllPosts() {
  const { posts, error, fetchPosts } = usePosts();
  const { users } = useUsers();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, fetchPosts]);

  if (error) {
    return <p>Ocorreu um erro ao carregar os posts.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg space-y-6" id="Posts">
      {/* Passamos fetchPosts para o NewPost */}
      <NewPost refreshPosts={fetchPosts} />

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum post disponível.</p>
      ) : (
        posts.map((postItem) => (
          <div key={postItem.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 cursor-pointer">
              <Link href={`/perfil/${postItem.userEmail}`}>
                <Image
                  src={postItem.userImage || "/default-avatar.png"}
                  alt={postItem.userName || "avatar do usuario"} 
                  width={50}
                  height={50}
                  className="rounded-full border"
                />
              </Link>
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
