import Sidebar from "@/components/navbar";
import Post from "@/components/post";
import Profile from "@/components/profileProps";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface PropsParams {
  params: {
    userName: string;
  };
}

export default async function Perfil({ params }: PropsParams) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 z-50">
        <Sidebar />
      </div>

      <main className="ml-64 w-full max-h-screen overflow-y-auto ">
        <Profile />
        <div className="mt-6">
          <Post />
        </div>
      </main>
    </div>
  );
}
