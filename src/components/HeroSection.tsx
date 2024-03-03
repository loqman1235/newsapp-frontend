import { heroSectionNewsData } from "@/data";
import HeroSectionItem from "./HeroSectionItem";

const HeroSection = () => {
  return (
    <div className="w-full px-5">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {heroSectionNewsData.map(
          (item, index) =>
            index === 0 && <HeroSectionItem key={item.id} {...item} />,
        )}
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
          {heroSectionNewsData.map(
            (item, index) =>
              index > 0 && (
                <HeroSectionItem key={item.id} {...item} fontSize="text-xl" />
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
