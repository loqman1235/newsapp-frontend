import HeroSection from "@/components/HeroSection";
import LatestPostsSection from "@/components/LatestPostsSection";
import MustReadSection from "@/components/MustReadSection";
import SideBar from "@/components/SideBar";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="container relative my-20 flex max-w-6xl gap-5">
        <div className="flex-[6]">
          <LatestPostsSection />
          <MustReadSection />
        </div>
        {/* Sticky Sidebar */}
        <div className="min-h-[400px] flex-[2]">
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default HomePage;
