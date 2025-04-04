import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

  export async function GET(req:Request) {
    try {
      const users = await prisma.comment.findMany(); // Busca todos os usuários
      return NextResponse.json(users, { status: 200 }); // Retorna a lista de usuários
    } catch (error) {
      return NextResponse.json(
        {
          error: "Erro ao buscar comentários.",
          details : (error as Error).message}, // Detalhes do erro}
          { status: 500 }
        
      )
    }
}