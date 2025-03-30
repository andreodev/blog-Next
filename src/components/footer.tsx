// components/Footer.tsx
"use client"
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16" id="footer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Sobre</h3>
            <Link href="/about" className="text-gray-400 hover:text-white mb-2">
              Sobre nós
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white mb-2"
            >
              Contato
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Termos de Serviço
            </Link>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com/andreodev"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <GithubIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Andreo Henrique. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
