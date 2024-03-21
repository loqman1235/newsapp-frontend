import HeroSection from "@/components/HeroSection";
import Post from "@/components/Post";
import Section from "@/components/Section";
import SkeletonPost from "@/components/skeleton/SkeletonPost";
import useFetch from "@/hooks/useFetch";
import { IPost } from "@/types";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { catSlug } = useParams();
  const { data: catsResult, isLoading } = useFetch("/cats", catSlug);

  return (
    <>
      <HeroSection />

      <div className="container relative my-20 max-w-6xl gap-5">
        <Section title={!isLoading && catsResult.category?.name} isPage>
          {/* POSTS */}
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonPost key={i} mode="large" />
              ))
            : catsResult.category.posts &&
              catsResult.category.posts.length > 0 &&
              catsResult &&
              catsResult.category.posts.map((post: IPost) => (
                <Post
                  key={post.id}
                  mode="large"
                  {...post}
                  url={`/${catSlug}/${post.slug}`}
                />
              ))}
        </Section>
      </div>
    </>
  );
};

export default CategoryPage;
