import { useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";

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

    try {
      const response = await fetch("/api/profile/users/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        alert("Erro ao atualizar perfil");
      } else {
        alert("Perfil atualizado com sucesso!");
        setIsEditing(false);
        window.location.reload(); // Recarrega após salvar
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-black">
        {/* Banner Preview */}
        {formData.banner && (
          <img
            src={formData.banner}
            alt="Banner"
            className="w-full h-32 object-cover rounded-t-lg"
          />
        )}

        {/* Imagem de Perfil */}
        <div className="flex justify-center -mt-12 mb-4">
          {formData.image && (
            <img
              src={formData.image}
              alt="Perfil"
              className="w-24 h-24 rounded-full border-4  object-cover"
            />
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleEdit} className="space-y-2 ">
            <h1>Nome: </h1>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="Nome"
            />
            <h1>Nome de Usuario:</h1>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="Nome de usuário"
              disabled
            />
            <h1>Email:</h1>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="E-mail"
              disabled
            />
            <h1>Avatar:</h1>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="URL da imagem de perfil"
            />
            <h1>Banner:</h1>
            <input
              type="text"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="URL do banner"
            />
            <h1>Bio: </h1>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="p-2 w-full rounded border resize-none"
              rows={3}
              placeholder="Biografia"
            />
            <h1>Localização</h1>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 w-full rounded border"
              placeholder="Localização"
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit">Salvar Alterações</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
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
