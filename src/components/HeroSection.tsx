import { heroSectionNewsData } from "@/data";
import HeroSectionItem from "./HeroSectionItem";

const HeroSection = () => {
  const renderHeroSectionItem = (start: number, end: number) => {
    return heroSectionNewsData
      .slice(start, end)
      .map((item) => (
        <HeroSectionItem
          key={item.id}
          {...item}
          fontSize={`text-xl ${start === 0 && "md:text-3xl"}`}
        />
      ));
  };

  return (
    <div className="my-5 w-full">
      <div className="container block max-w-6xl flex-col gap-2 overflow-hidden md:flex md:h-[400px] md:flex-row">
        <div className="mb-2 h-full w-full md:mb-0 md:w-1/2">
          {renderHeroSectionItem(0, 1)}
        </div>

        <div className="flex h-full w-full flex-col gap-2 md:w-1/2">
          <div className="h-1/2 w-full ">{renderHeroSectionItem(1, 2)}</div>
          <div className="flex h-1/2 w-full flex-col gap-2 md:flex-row">
            <div className="h-full w-full md:w-1/2">
              {renderHeroSectionItem(2, 3)}
            </div>
            <div className="h-full w-full md:w-1/2">
              {renderHeroSectionItem(3, 4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
