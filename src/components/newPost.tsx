"use client"
import { useState } from "react";

export default function NewPost({ refreshPosts } : any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPostData = { title, content, image };

    try {
      const response = await fetch("/api/profile/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setImage("");

        refreshPosts(); // Chama a função para atualizar os posts após a criação
      } else {
        console.error("Erro ao criar post");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="w-full p-2 border rounded"/>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Conteúdo" className="w-full p-2 border rounded h-24"></textarea>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="URL da Imagem" className="w-full p-2 border rounded"/>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Publicar
      </button>
    </form>
  );
}
