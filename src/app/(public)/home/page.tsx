import AllPosts from "@/components/allPosts";
import Footer from "@/components/footer";
import Sidebar from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 ">
        <main className="p-4">
          <AllPosts />
        </main>
        <Footer />
      </div>
    </div>
  );
}
