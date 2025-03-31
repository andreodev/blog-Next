
import Navbar from "@/components/navbar";
import Post from "@/components/post";
import Profile from "@/components/profileProps";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Perfil() {
  const session = await getServerSession();

  if(!session) {
    redirect("/")
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <Profile />
      </div>
      <div>
        <Post />
      </div>
    </>
  );
}
