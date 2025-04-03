import Navbar from "@/components/navbar";
import Post from "@/components/post";
import Profile from "@/components/profileProps";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface PropsParams {
  params: {
    userName: string
  }
}

export default async function Perfil({params} : PropsParams) {
  const session = await getServerSession()
  if(!session) {
    redirect("/login")
  }
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Profile />
      </div>
      <Post />
      <div>
      </div>
    </>
  );
}
