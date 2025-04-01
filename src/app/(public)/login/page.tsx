"use client"; // Força execução no cliente

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import LoginForm from "@/components/loginForm";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Evita múltiplos redirecionamentos

  useEffect(() => {
    if (session && !loading) {
      setLoading(true); // Evita execução duplicada
      
      // Dispara os confetes
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });

      // Pequeno delay para os confetes aparecerem antes do redirecionamento
      setTimeout(() => {
        router.push("/home");
      }, 9000);
    }
  }, [session, loading, router]);

  if (status === "loading") return <p>Carregando...</p>;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
