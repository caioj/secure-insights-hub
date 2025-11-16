import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Hero from "@/components/Home/Hero";
import FeaturedCards from "@/components/Home/FeaturedCards";
import RecentUpdates from "@/components/Home/RecentUpdates";
import QuickActions from "@/components/Home/QuickActions";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCards />
        <RecentUpdates />
        <QuickActions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
