import AllPosts from "@/components/allPosts";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default async function HomePage() {
  return (
    <div className="">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="
        mt-4">
          <AllPosts />
        </div>
      </main>
      <Footer />
    </div>
  );
}
