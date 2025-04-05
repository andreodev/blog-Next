"use client";

import { signIn } from "next-auth/react";
import { useState } from "react"; // Para controlar o erro e o sucesso
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para controlar a mensagem de erro
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para controlar a mensagem de sucesso

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null); // Limpa a mensagem de erro antes de tentar novamente
    setSuccessMessage(null); // Limpa a mensagem de sucesso ao tentar novamente

    const formData = new FormData(e.currentTarget);

    const data = {
      userName: formData.get("userName") as string,
      password: formData.get("password") as string,
    };


    const result = await signIn("credentials", {
      ...data,
      redirect: false, // Não redireciona automaticamente
      callbackUrl: "/",
    });

    if (result?.error) {
      // Se houver erro, define a mensagem de erro
      setErrorMessage(result.error);
    } else {
      // Exibe mensagem de sucesso e redireciona após 2 segundos
      setSuccessMessage("Login bem-sucedido! Redirecionando...");

      // Aguarda a exibição da mensagem de sucesso antes de redirecionar
      setTimeout(() => {
        window.location.href = "/home"; // Redireciona para a página inicial após 2 segundos
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Faça Login</CardTitle>
          <CardDescription>
            Digite seu e-mail abaixo para fazer login em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="User">Email</Label>
                <Input
                  id="user"
                  name="userName"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                Entre com o Github
              </Button>
            </div>
            {/* Exibindo a mensagem de erro, se existir */}
            {errorMessage && (
              <div className="mt-4 text-center text-sm text-red-600">
                {errorMessage}
              </div>
            )}
            {/* Exibindo a mensagem de sucesso, se existir */}
            {successMessage && (
              <div className="mt-4 text-center text-sm text-green-600">
                {successMessage}
              </div>
            )}
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <a href="/register" className="underline underline-offset-4">
                Registre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
