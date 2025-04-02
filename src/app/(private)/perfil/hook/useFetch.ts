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
            userEmail: post.userEmail,
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
            nameUser: user.name,
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

  return { users, error };
}

export function useComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchComments() {
    try {
      const response = await fetch("/api/profile/post/comments");

      if (!response.ok) {
        throw new Error("Erro ao buscar comments");
      }

      const data = await response.json();

      setComments(
        data.map((comment: any) => {
          return {
            id: comment.id,
            userEmail: comment.userEmail,
            postId: comment.postId,
            content: comment.content,
            createdAt: comment.createdAt,
          };
        })
      );
    } catch (error) {
      setError("Erro ao buscar");
      console.error("Erro ao buscar eventos: ", error);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return { comments, error };
}
