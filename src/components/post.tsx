"use client";

import { usePosts } from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { PostDto } from "./DTO/postDTO";


export default function Post() {
  const { data, status } = useSession();
  const { post, error } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState< PostDto[]>([]);

  useEffect(() => {
    if (post && post.length > 0) {
      const userPosts = post.filter(postItem => postItem.userEmail === data?.user?.email);
      setFilteredPosts(userPosts);
    }
    
  }, [post, data]);

  if (error) {
    console.error("Erro:", error);
  }

  return (
    <div className="grid gap-6 p-4 max-w-2xl mx-auto">
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4">{post.content}</p>
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="font-medium text-gray-700">{post.userEmail}</span>
          </div>
        </div>
      ))}
    </div>
  );
};