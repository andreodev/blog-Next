import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

  export async function GET(req: Request) {
    const session = await getServerSession(authOptions)

    if(!session) {
      return NextResponse.json({ error: "Acesso Negado"}, {status: 401})
    }
    try {
      const post = await prisma.post.findMany(); // Busca todos os usuários
      return NextResponse.json(post, { status: 200 }); // Retorna a lista de usuários
      
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao buscar posts.", details: (error as Error).message },
        { status: 500 }
      );
    }
  }