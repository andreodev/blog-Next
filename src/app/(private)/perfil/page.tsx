
import Navbar from "@/components/navbar";
import Post from "@/components/post";
import ProfileProps from "@/components/profileProps";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Perfil() {


  return (
    <>
      <Navbar />
      <div className="p-6">
        <ProfileProps />
      </div>
      <div>
        <Post />
      </div>
    </>
  );
}
