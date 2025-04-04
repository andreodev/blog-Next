"use client";

import {
  usePosts,
  useUsers,
  useComments,
} from "@/app/(private)/perfil/hook/useFetch";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NewPost from "@/components/newPost";
import PostCard from "@/components/postCard";
import PostModal from "@/components/postModal";

// Tipagens
type Post = {
  id: string;
  userName: string;
  name?: string;
  createdAt: string;
  [key: string]: any;
};

type User = {
  userName: string;
  image?: string;
};

type Comment = {
  postId: string;
  [key: string]: any;
};

type EnhancedPost = Post & {
  userImage: string;
  comments: Comment[];
};

export default function AllPosts() {
  const { posts, error, fetchPosts } = usePosts();
  const { users } = useUsers();
  const { comments } = useComments();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<EnhancedPost | null>(null);

  // Redireciona para login se não autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Processa os posts com user info e comentários
  const enhancedPosts: EnhancedPost[] = useMemo(() => {
    if (!posts?.length || !users?.length) return [];


    const postsWithUser = posts.map((post) => {
      const user = users.find((u) => u.userName === post.userName);
      return {
        ...post,
        userName: post.userName || "Desconhecido",
        userImage: user?.image || "/default-avatar.png",
      };
    });

    const sorted = postsWithUser.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted.map((post) => ({
      ...post,
      comments: comments.filter((comment) => comment.postId === post.id),
    }));
  }, [posts, users]);

  const handleOpenModal = (post: EnhancedPost) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  if (error)
    return (
      <p className="text-red-500 text-center">
        Ocorreu um erro ao carregar os posts.
      </p>
    );

  if (!posts?.length || !users?.length) {
    return <p className="text-center text-gray-500">Carregando posts...</p>;
  }

  return (
    <div className="max-w-lg mx-auto rounded-lg space-y-6" id="Post">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <NewPost refreshPosts={fetchPosts} />
      </div>

      {enhancedPosts.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum post disponível.</p>
      ) : (
        enhancedPosts.map((post) => (
          <PostCard key={post.id} post={post} onOpenModal={handleOpenModal} />
        ))
      )}

      {showModal && selectedPost && (
        <PostModal post={selectedPost} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
