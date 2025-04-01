import Navbar from "@/components/navbar";
import Post from "@/components/post";
import Profile from "@/components/profileProps";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: { email: string };
}

export default async function Perfil({ params }: Props) {
  const nameDecodificado = decodeURIComponent(params.email);
  const session = await getServerSession()
  if(!session) {
    redirect("/login")
  }
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Profile params={{ email: nameDecodificado }} />
      </div>
      <div>
        <Post params={{ email: nameDecodificado }} />
      </div>
    </>
  );
}
