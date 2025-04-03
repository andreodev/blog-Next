import bgHome from "@/assets/images/anime.jpg"
import HeaderProps from "@/components/headerImage";



export default function PageHome() {

  return(
    <div>
      <HeaderProps buttonText="LOGIN" imageSrc={bgHome} text="SEJA BEM VINDO AO MEU PROJETO, FAÇA LOGIN OU SE CADASTRE"/>
      <main>
        <div>
          <h1>DESENVOLVIDO POR ANDREO HENRIQUE</h1>
        </div>
      </main>
    </div>
  )
}