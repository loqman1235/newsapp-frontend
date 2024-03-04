import TopBar from "./TopBar";
import BrandBar from "./BrandBar";
import NavigationBar from "./NavigationBar";
// import { buttonVariants } from "@/components/ui/button";

const Header = () => {
  return (
    <div className=" w-full shadow">
      <TopBar />
      <BrandBar />
      <NavigationBar />
    </div>
  );
};

export default Header;
