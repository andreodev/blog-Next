import HeaderProps from "./components/headerImage";
import Filter from "./components/filters";
import headerImage from "@/app/images/products.png"

export default function ProductsPage() {
  return (
    <div>
      <header>
      <HeaderProps
        buttonText="Shop Now"
        text="Lorem ipsum dolor sit amet, cons ecte tur adipiscing elit."
        imageSrc={headerImage}
      />
      </header>
      <main>
        <Filter />
      </main>
    </div>
  );
}
