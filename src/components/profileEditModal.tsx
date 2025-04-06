"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import toast from "react-hot-toast";

interface UserModalProps {
  user: any;
  onClose: () => void;
}

export default function ConfigProfile({ user, onClose }: UserModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    userName: user.userName || "",
    email: user.email || "",
    password: "",
    banner: user.banner || "",
    image: user.image || "",
    bio: user.bio || "",
    location: user.location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      ...formData,
      nameUser: user.userName,
    };

    const toastId = toast.loading("Atualizando perfil...");

    try {
      const response = await fetch("/api/profile/users/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error("Erro ao atualizar perfil", { id: toastId });
      } else {
        toast.success("Perfil atualizado com sucesso!", { id: toastId });
        setIsEditing(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro inesperado ao atualizar perfil", { id: toastId });
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-black p-16">
        {formData.banner && (
          <img
            src={formData.banner}
            alt="Banner"
            className="w-full h-32 object-cover rounded-t-lg"
          />
        )}

        <div className="flex justify-center -mt-12 mb-4">
          {formData.image && (
            <img
              src={formData.image}
              alt="Perfil"
              className="w-24 h-24 rounded-full border-4 object-cover"
            />
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleEdit} className="space-y-2">
            {/* Inputs */}
            <input name="name" value={formData.name} onChange={handleChange} className="p-2 w-full rounded border" placeholder="Nome" />
            <input name="userName" value={formData.userName} disabled className="p-2 w-full rounded border" placeholder="Usuário" />
            <input name="email" value={formData.email}  className="p-2 w-full rounded border" placeholder="E-mail" />
            <input name="image" value={formData.image} onChange={handleChange} className="p-2 w-full rounded border" placeholder="Avatar URL" />
            <input name="banner" value={formData.banner} onChange={handleChange} className="p-2 w-full rounded border" placeholder="Banner URL" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} className="p-2 w-full rounded border" rows={3} placeholder="Bio" />
            <input name="location" value={formData.location} onChange={handleChange} className="p-2 w-full rounded border" placeholder="Localização" />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit">Salvar Alterações</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>Cancelar</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2 px-4">
            <p><strong>Nome:</strong> {formData.name}</p>
            <p><strong>Usuário:</strong> {formData.userName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Bio:</strong> {formData.bio}</p>
            <p><strong>Localização:</strong> {formData.location}</p>

            <div className="text-center pt-4">
              <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
