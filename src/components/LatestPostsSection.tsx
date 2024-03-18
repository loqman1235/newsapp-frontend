import useFetch from "@/hooks/useFetch";
import Post from "./Post";
import Section from "./Section";
import { IPost } from "@/types";
import { Skeleton } from "./ui/skeleton";

const LatestPostsSection = () => {
  const { data: latestPosts, isLoading } = useFetch("/posts?limit=6");

  return (
    <div className="container max-w-6xl">
      <Section title="Latest News" href="/latest">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
          : latestPosts?.posts.map((post: IPost, i: number) => (
              <Post key={post.id} mode={i > 2 ? "small" : "large"} {...post} />
            ))}
      </Section>
    </div>
  );
};

export default LatestPostsSection;
