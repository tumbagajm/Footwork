import HeroSection from "../components/home/HeroSection";
import ProductSection from "../components/home/ProductSection";


const HomePage = () => {
  document.title = "ZUITT Shop";
    return (
      <>
        <HeroSection />
        <ProductSection />
      </>
    )
  }

export default HomePage;