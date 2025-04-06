"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function NewComment({ postId, refreshComments }: any) {
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const html = document.querySelector("html");

    if (showModal) {
      html?.classList.add("overflow-hidden");
    } else {
      html?.classList.remove("overflow-hidden");
    }

    return () => {
      html?.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim() === "") {
      setError("O comentário não pode estar em branco.");
      return;
    }

    try {
      const response = await fetch("/api/profile/post/comments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, postId }),
      });

      if (response.ok) {
        setContent("");
        setError("");
        setShowModal(false);
        refreshComments();
        toast.success("Comentário adicionado com sucesso!");
      } else {
        setError("Erro ao criar comentário. Tente novamente.");
        console.error("Erro ao criar comentário");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
      console.error("Erro ao conectar com o servidor", error);
    }
  };

  return (
    <>
      <div
        className="p-3 rounded-lg shadow-md cursor-pointer text-gray-300 bg-gray-400 hover:bg-gray-300"
        onClick={() => setShowModal(true)}
      >
        <p className="text-gray-500">Comentar...</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Novo comentário</h2>
              <Button
                onClick={() => {
                  setShowModal(false);
                  setContent("");
                  setError("");
                }}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                name="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Digite seu comentário"
                className="w-full p-2 border rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
              >
                Comentar
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
