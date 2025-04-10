import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if ( !body.password || !body.name) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios!" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { nameUser: body.name } });
    if (existingUser) {
      return NextResponse.json({ error: "nome de usuário já cadastrado!" }, { status: 400 });
    }

    const hashedPassword = await hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        nameUser: body.name,
        name: body.nameUser,
        password: hashedPassword,
        image: body.image || "https://i.pinimg.com/736x/7f/e4/25/7fe425baaa808391cd7e24f091a9967b.jpg",
      },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso!", user }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Erro ao criar usuário." }, { status: 500 });
  }
}