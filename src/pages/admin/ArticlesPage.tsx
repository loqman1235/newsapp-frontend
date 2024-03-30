import Article from "@/components/admin/Article";
import useFetch from "@/hooks/useFetch";
import { IPost } from "@/types";
import { ClipLoader } from "react-spinners";
import api from "@/services/api";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const ArticlesPage = () => {
  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  const { data: articlesResult, isLoading } = useFetch("/posts");
  const [articles, setArticles] = useState<IPost[]>(
    isLoading ? [] : articlesResult.posts,
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        setArticles((prev) => prev.filter((article) => article.id !== id));
        toast.success("Article deleted successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.log(error.response?.data.message);
      }

      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setArticles(articlesResult.posts);
    }
  }, [articlesResult, isLoading]);

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
        {articles.map((article: IPost) => (
          <Article key={article.id} {...article} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
