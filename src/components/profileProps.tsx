"use client";


import Image from "next/image";

export default function ProfileProps() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="relative">
        <Image
          width={100}
          height={10}
          src="https://i.pinimg.com/736x/f1/4c/4c/f14c4c88a836ec9c5f79d313e0d8cd7d.jpg"
          alt="Banner"
          className="w-full h-32 object-cover rounded-t-lg"
          priority
        />
        {/* Imagem do perfil flutuante */}
        <div className="absolute left-4 bottom-[-20px]">
          <Image
            width={100}
            height={100}
            src="https://i.pinimg.com/736x/f1/4c/4c/f14c4c88a836ec9c5f79d313e0d8cd7d.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white"
            priority
          />
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-semibold text-gray-800">
          "teste"
        </h1>
        <p className="text-sm text-gray-600">@"resre"</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium text-gray-800">Sobre</h2>
        <p className="text-gray-600 text-sm">asd</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium text-gray-800">Localização</h2>
        <p className="text-gray-600 text-sm">adasd</p>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm">
          Editar Perfil
        </button>
        <button className="px-4 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 text-sm">
          Ver Posts
        </button>
      </div>
    </div>
  );
}
