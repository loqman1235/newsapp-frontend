import HeroSectionItem from "./HeroSectionItem";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { IPost } from "@/types";
const HeroSection = () => {
  const { data: heroSectionPosts, isLoading } = useFetch("/posts?limit=4");

  const renderHeroSectionItem = (start: number, end: number) => {
    if (!isLoading) {
      console.log(heroSectionPosts);
    }
    return isLoading ||
      !heroSectionPosts ||
      !heroSectionPosts.posts ||
      heroSectionPosts.posts.length === 0 ? (
      <Skeleton className="h-full w-full" />
    ) : (
      heroSectionPosts?.posts
        .slice(start, end)
        .map((item: IPost) => (
          <HeroSectionItem
            key={item.id}
            {...item}
            fontSize={`text-xl ${start === 0 && "md:text-3xl"}`}
            url={`category/${item.categories[0].slug}/${item.slug}`}
          />
        ))
    );
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
