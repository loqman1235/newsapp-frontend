import { shortenText } from "@/lib/utils";
import { IPost } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

interface IArticle extends IPost {
  isPublished?: boolean;
}

const Article = ({
  slug,
  title,
  thumbnail,
  categories,
  isPublished,
}: IArticle) => {
  return (
    <div className="w-full bg-background shadow">
      {/* THUMBNAIL */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-400">
        <img
          src={thumbnail.url || ""}
          alt={title}
          className="h-full w-full object-cover"
        />

        {categories &&
          categories.map((cat) => (
            <div
              key={cat.id}
              className="absolute left-0 top-0 block w-fit select-none bg-black/80 px-2 py-px text-sm capitalize tracking-wide text-background"
            >
              {cat.name}
            </div>
          ))}
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold leading-tight">
          {shortenText(title)}
        </h2>

        <Badge variant={isPublished ? "default" : "secondary"} className="my-4">
          {isPublished ? "Public" : "Draft"}
        </Badge>

        {/* CTAS */}
        <div className="flex items-center gap-1">
          <Link
            className="flex items-center justify-center bg-foreground p-2 text-background"
            to={`/dashboard/articles/edit/${slug}`}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            onClick={() => console.log("delete article")}
            className="flex items-center justify-center bg-red-600 p-2 text-background"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
