import HeroSection from "@/components/HeroSection";
import Post from "@/components/Post";
import Section from "@/components/Section";
import SkeletonPost from "@/components/skeleton/SkeletonPost";
import useFetch from "@/hooks/useFetch";
import { IPost } from "@/types";

const LatestNewsPage = () => {
  const { data: latestPosts, isLoading } = useFetch("/posts");

  return (
    <>
      <HeroSection />
      <div className="relative my-20 flex max-w-6xl gap-5 !px-0 md:container">
        <div className="container max-w-6xl">
          <div className="flex-[6]">
            <Section title="Latest News" isPage={true}>
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonPost key={i} mode="large" />
                  ))
                : latestPosts?.posts.map((post: IPost) => (
                    <Post key={post.id} mode="large" {...post} />
                  ))}
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNewsPage;
