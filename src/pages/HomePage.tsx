import HeroSection from "@/components/HeroSection";
import LatestPostsSection from "@/components/LatestPostsSection";
import MustReadSection from "@/components/MustReadSection";
import SideBar from "@/components/SideBar";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="relative my-20 flex max-w-6xl gap-5 !px-0 md:container">
        <div className="flex-[6]">
          <LatestPostsSection />
          <MustReadSection />
        </div>
        {/* Sticky Sidebar */}
        <div className="hidden min-h-[400px] flex-[2] md:block">
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default HomePage;
