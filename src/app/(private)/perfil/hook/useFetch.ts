import { useEffect, useState } from "react";

export function usePosts() {
  const [post, setPosts] = useState<any[]>([]);
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
            createdAt: post.createdAt,
            userEmail: post.userEmail,
          };
        })
      );
    } catch (error) {
      setError("Erro ao buscar");
      console.error("Erro ao buscar eventos: ", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return { post, error };
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
