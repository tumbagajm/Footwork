import HeroSection from "../components/home/HeroSection";
import ProductSection from "../components/home/ProductSection";
import PromoSection from "../components/home/PromoSection";
import FooterSection from "../components/home/FooterSection";


const HomePage = () => {
  document.title = "Footwork";
    return (
      <>
        <HeroSection />
        <ProductSection />
        <PromoSection />
        <FooterSection />
      </>
    )
  }

export default HomePage;