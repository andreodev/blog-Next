import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

  export async function GET(req:Request) {
    try {
      const users = await prisma.user.findMany(); // Busca todos os usuários
      return NextResponse.json(users, { status: 200 }); // Retorna a lista de usuários
    } catch (error) {
      return NextResponse.json(
        {
          error: "Erro ao buscar usuários.",
          details : (error as Error).message}, // Detalhes do erro}
          { status: 500 }
        
      )
    }
}