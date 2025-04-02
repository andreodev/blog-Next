"use client";
import { useState, useEffect } from "react";
import { ImageIcon, X } from "lucide-react";
import { Button } from "./ui/button";

export default function NewPost({ refreshPosts }: any) {
  const [post, setPost] = useState({ title: "", content: "", image: "" });
  const [showModal, setShowModal] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        setPost({ title: "", content: "", image: "" });
        setShowModal(false);
        refreshPosts();
      } else {
        console.error("Erro ao criar post");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor", error);
    }
  };

  return (
    <>
      <div className="p-3 rounded-lg shadow-md cursor-pointer text-gray-300 bg-gray-300 hover:bg-gray-50" onClick={() => setShowModal(true)}>
        <p className="text-gray-500">O que você está pensando?</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center   bg-[#050505b2] pointer-events-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Criar publicação</h2>
              <Button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5 cursor-pointer" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Título"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="O que você está pensando?"
                className="w-full p-2 border rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                >
                  <ImageIcon className="w-6 h-6 text-blue-500 cursor-pointer" />
                </Button>
              </div>
              {showImageInput && (
                <input
                  type="text"
                  name="image"
                  value={post.image}
                  onChange={handleChange}
                  placeholder="URL da imagem"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
              <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                Publicar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
