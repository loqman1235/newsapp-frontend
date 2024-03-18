import HeroSectionItem from "./HeroSectionItem";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
const HeroSection = () => {
  const [heroSectionPosts, setHeroSectionPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroSectionPosts = async () => {
      try {
        const response = await api.get("/posts?limit=4");
        const { posts } = response.data;

        if (response.status === 200) {
          setHeroSectionPosts(posts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroSectionPosts();
  }, []);

  const renderHeroSectionItem = (start: number, end: number) => {
    return isLoading ? (
      <Skeleton className="h-full w-full" />
    ) : (
      heroSectionPosts
        .slice(start, end)
        .map((item) => (
          <HeroSectionItem
            key={item.id}
            {...item}
            fontSize={`text-xl ${start === 0 && "md:text-3xl"}`}
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
