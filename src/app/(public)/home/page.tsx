
import AllPosts from "@/components/allPosts";
import Footer from "@/components/footer";
import Header from "@/components/headerImage";
import Navbar from "@/components/navbar";
import bgImage from "@/assets/images/anime.jpg"

export default async function HomePage() {
  return(
    <div>
      <header>
        <Navbar />
        <Header imageSrc={bgImage} buttonText="EXPLORAR" text="SEJA BEM VINDO AO MEU PROJETO AndruSocial"/>
      </header>
      <main>
        <div >
            <AllPosts />
        </div>
        
      </main>
      <Footer />
    </div>
  )
}