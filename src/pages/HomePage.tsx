import HeroSection from "@/components/HeroSection";
import LatestPostsSection from "@/components/LatestPostsSection";
import SideBar from "@/components/SideBar";
import { useState } from "react";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <HeroSection />
      <div className="relative my-20 flex max-w-6xl gap-5 !px-0 md:container">
        <div className="flex-[6]">
          <LatestPostsSection />
          {/* MUST READ */}
        </div>
        {/* Sticky Sidebar */}

        {showSidebar && (
          <div className="hidden min-h-[400px] flex-[2] md:block">
            <SideBar />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
