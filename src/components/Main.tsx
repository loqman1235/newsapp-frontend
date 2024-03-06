import LatestPostsSection from "./LatestPostsSection";
import SideBar from "./SideBar";
// import MustReadSection from "./MustReadSection";

const Main = () => {
  return (
    <div className="container my-20 flex max-w-6xl items-start gap-10">
      <LatestPostsSection />
      <SideBar />
    </div>
  );
};

export default Main;
