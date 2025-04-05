import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    try {
      const response = await fetch("/api/profile/post");

      if (!response.ok) {
        throw new Error("Erro ao buscar Posts");
      }

      const data = await response.json();
      setPosts(
        data.map((post: any) => {
          return {
            id: post.id,
            title: post.title,
            content: post.content,
            image: post.image,
            comment: post.comment,
            createdAt: post.createdAt,
            userName: post.userName,
          };
        })
      );
    } catch (error) {
      setError("Erro ao buscar posts");
      console.error("Erro ao buscar posts:", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, error, fetchPosts }; // Retornamos fetchPosts para chamar manualmente
}

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      const response = await fetch("/api/profile/users");

      if (!response.ok) {
        throw new Error("Erro ao buscar Usuarios");
      }

      const data = await response.json();

      setUsers(
        data.map((user: any) => {
          return {
            id: user.id,
            email: user.email,
            userName: user.nameUser,
            name: user.name,
            image: user.image,
            banner: user.banner,
            bio: user.bio,
            location: user.location,
          };
        })
      );
    } catch (error) {
      setError("Erro ao buscar");
      console.error("Erro ao buscar eventos: ", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, error, fetchUsers }; // ✅ Agora exporta fetchUsers
}

export function useComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchComments(postId: string) {
    try {
      const response = await fetch(`/api/profile/post/comments?postId=${postId}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar comentários");
      }

      const data = await response.json();

      // Filtra apenas os comentários do post correspondente
      const filteredComments = data.filter((comment: any) => comment.postId === postId);

      setComments(
        filteredComments.map((comment: any) => ({
          id: comment.id,
          postId: comment.postId,
          content: comment.content,
          createdAt: comment.createdAt,
          image: comment.image,
          userName: comment.userName,
        }))
      );
    } catch (error) {
      setError("Erro ao buscar");
      console.error("Erro ao buscar comentários: ", error);
    }
  }

  return { comments, error, fetchComments }; // sem useEffect automático
}
