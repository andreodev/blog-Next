import HeaderProps from "../products/components/headerImage";
import image1 from "@/app/images/anime.jpg"
import CardsProps from "@/components/CardsProps";



export default function HomePage() {
  return(
    <div>
      <header>
        <HeaderProps 
        text="Lorem ipsum dolor sit amet, cons ecte tur adipiscing elit. Sed ullam vitae" 
        buttonText="Shop" 
        imageSrc={image1}/> 
      </header>
      <main>
        <div className="flex items-center justify-center gap-14">
        <CardsProps 
        imageUrl={image1} 
        name="Lorem ipsum dolor sit amet, cons ecte tur adipiscing elit. Sed ullam vitae" 
        price="12.00"
        />
        <CardsProps 
        imageUrl={image1} 
        name="Lorem ipsum dolor sit amet, cons ecte tur adipiscing elit. Sed ullam vitae" 
        price="12.00"
        />
        <CardsProps 
        imageUrl={image1} 
        name="Lorem ipsum dolor sit amet, cons ecte tur adipiscing elit. Sed ullam vitae" 
        price="12.00"
        />

        </div>
        
      </main>
    </div>
  )
}