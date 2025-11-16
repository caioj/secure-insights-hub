import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Hero from "@/components/Home/Hero";
import FeaturedCards from "@/components/Home/FeaturedCards";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
