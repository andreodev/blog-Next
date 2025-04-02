import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";


// ✅ Rota para criar um novo post (POST)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if(!session) {
    return NextResponse.json({ error: "Acesso Negado" }, { status: 401 });
  }

  try {
    const { title, content, image } = await req.json();

    // Verifica se os campos obrigatórios estão preenchidos
    if (!title || !content) {
      return NextResponse.json(
        { error: "Título e conteúdo são obrigatórios." },
        { status: 400 }
      );
    }



    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        image,
        userEmail: session?.user?.email, // Adicionando o e-mail do usuário
        createdAt: new Date(), // Criando a data automaticamente
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar post.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
