import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {name, password, image, banner, bio, location, nameUser} = body;

    if(!nameUser) {
      return NextResponse.json({error: "O campo email é obrigatório"}, {status: 400})
    }
    //verificar se o usuario existe

    const existingUser = await prisma.user.findUnique({ where: {  nameUser } });
    if (!existingUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
}
  let updatePassword = existingUser.password;
  if (password) {
    updatePassword = await hash(password, 10);
  }

  const updateUser = await prisma.user.update({
    where: {nameUser},
    data: {
      name: name || existingUser.name,
      password: updatePassword,
      image: image || existingUser.image,
      banner: banner || existingUser.banner,
      bio: bio || existingUser.bio,
      location: location || existingUser.location,
    },
  });

  return NextResponse.json({ message: "Usuário atualizado com sucesso", user: updateUser }, { status: 200 });
} catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário", details: (error as Error).message }, { status: 500 });
  }
}