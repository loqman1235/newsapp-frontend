import { shortenText } from "@/lib/utils";
import { IPost } from "@/types";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IArticle extends IPost {
  published?: boolean;
  handleDelete: (id: string) => void;
}

const Article = ({
  id,
  slug,
  title,
  thumbnail,
  categories,
  published,
  handleDelete,
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

        <Badge variant={published ? "default" : "secondary"} className="my-4">
          {published ? "Public" : "Draft"}
        </Badge>

        {/* CTAS */}
        <div className="flex items-center gap-1">
          <Link
            className="flex items-center justify-center bg-foreground p-2 text-background"
            to={`/dashboard/articles/edit/${slug}`}
          >
            <SquarePen className="h-4 w-4" />
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={() => console.log(id)}
                className="flex items-center justify-center bg-red-600 p-2 text-background"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  article.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(id)}
                  className="bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Article;
