"use client";

import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    // Fundo do modal (overlay)
    <div
      className="fixed inset-0 bg-[#050505b2] bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Fecha o modal ao clicar no fundo
    >
      {/* Conteúdo do modal */}
      <div
        className="bg-white rounded-lg shadow-lg relative p-4 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
      >
        {/* Botão de fechar */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 mr-6 cursor-pointer"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Conteúdo do modal */}
        <div className="overflow-y-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  );
}
