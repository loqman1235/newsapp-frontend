import SkeletonPostPage from "@/components/skeleton/SkeletonPostPage";
import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();
  const { data: postResult, isLoading } = useFetch("posts", postSlug || "");
  const { post } = postResult;

  // Update post view
  useEffect(() => {
    const updatePostView = async () => {
      try {
        await api.patch(`/posts/${postSlug}/view`);
      } catch (error) {
        console.log(error);
      }
    };

    updatePostView();
  }, [postSlug]);

  if (isLoading) {
    return <SkeletonPostPage />;
  } else {
    return (
      <div className="container my-10 max-w-6xl text-start">
        <h1 className="mb-5  font-mono text-2xl font-bold">{post?.title}</h1>
        <div className="mb-5 text-sm text-muted-foreground">
          3 March 2024, John Doe
        </div>
        <div className="mb-5 h-[354px] w-full">
          <img
            src={post?.thumbnail?.url}
            alt={post?.title}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-muted-foreground">{post?.content}</p>
      </div>
    );
  }
};

export default PostPage;
