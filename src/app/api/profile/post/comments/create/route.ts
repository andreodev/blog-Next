// /app/api/comment/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 401 });
  }

  try {
    const { content, postId, } = await req.json();

    if (!content || !postId) {
      return NextResponse.json(
        { error: "Conteúdo e postId são obrigatórios." },
        { status: 400 }
      );
    }

    const nameUser = session.user?.name;
    const imageUser = session.user?.image;

    if (!nameUser) {
      return NextResponse.json(
        { error: "Nome do usuário não encontrado na sessão." },
        { status: 400 }
      );
    }

    // Criação do comentário com userName e postId conectados via relations
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        userName: nameUser,
        createdAt: new Date(),
        image: imageUser || null, 
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar comentário", details: (error as Error).message },
      { status: 500 }
    );
  }
}
