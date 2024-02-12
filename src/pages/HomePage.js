import HeroSection from "../components/home/HeroSection";
import ProductSection from "../components/home/ProductSection";
import PromoSection from "../components/home/PromoSection";


const HomePage = () => {
  document.title = "Footwork";
    return (
      <>
        <HeroSection />
        <ProductSection />
        <PromoSection />
      </>
    )
  }

export default HomePage;