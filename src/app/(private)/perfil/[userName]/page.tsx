import Post from "@/components/post";
import Profile from "@/components/profileProps";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Perfil() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
        <Profile />
          <Post />
    </>
  );
}
