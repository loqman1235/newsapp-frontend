import SkeletonPostPage from "@/components/skeleton/SkeletonPostPage";
import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import { format } from "date-fns";
import { Calendar, Pencil } from "lucide-react";

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
      <div className="container my-10 max-w-4xl text-start">
        <h1 className="mb-2  font-mono text-2xl font-bold">{post?.title}</h1>
        <div className="mb-5 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            {" "}
            <Calendar className="h-3.5 w-3.5" />{" "}
            {format(new Date(post?.createdAt), "dd MMM yyyy")}
          </span>
          <div className="h-0.5 w-0.5 rounded-full bg-muted-foreground"></div>
          <span className="flex items-center gap-1">
            <Pencil className="h-3.5 w-3.5" /> {post?.author?.name}
          </span>
        </div>
        <div className="mb-5 h-[354px] w-full overflow-hidden">
          <img
            src={post?.thumbnail?.url}
            alt={post?.title}
            className="h-full w-full object-cover"
          />
        </div>
        {/* <p className="text-muted-foreground">{post?.content}</p> */}
        <ReactQuill value={post?.content} readOnly={true} theme={"bubble"} />
      </div>
    );
  }
};

export default PostPage;
