import Article from "@/components/admin/Article";
import useFetch from "@/hooks/useFetch";
import { IPost } from "@/types";
import { ClipLoader } from "react-spinners";

const ArticlesPage = () => {
  const { data: articlesResult, isLoading } = useFetch("/posts");

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <ClipLoader className="text-foreground" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Articles</h2>
      <div className="mb-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {articlesResult &&
          articlesResult.posts &&
          articlesResult.posts.length > 0 &&
          articlesResult.posts.map((article: IPost) => (
            <Article key={article.id} {...article} />
          ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
