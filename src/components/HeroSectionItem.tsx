import { shortenText } from "@/lib/utils";
import { Link } from "react-router-dom";
import { IPost } from "@/types";

interface HeroSectionItemProps extends IPost {
  fontSize?: string;
  url: string;
}

const HeroSectionItem = ({
  thumbnail,
  title,
  categories,
  fontSize = "text-xl md:text-3xl",
  url,
}: HeroSectionItemProps) => {
  return (
    <Link to={url} className="relative block h-full w-full overflow-hidden">
      {/* THUMBNAIL */}
      <div className="h-full w-full">
        {/* IMAGE */}
        <img
          src={thumbnail.url}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex items-end bg-black/50 p-5  transition-all duration-700 hover:bg-black/20">
        <div className="flex flex-col gap-2">
          {/* CATEGORY */}
          {categories.map((category) => (
            <Link
              key={category?.id}
              to={`/cat/${title}`}
              className="block w-fit bg-black/80  px-2 py-px text-sm capitalize tracking-wide text-white"
            >
              {category?.name}
            </Link>
          ))}
          {/* TITLE */}
          <h1
            className={`font-mono font-bold leading-tight text-white ${fontSize}`}
          >
            {shortenText(title, 40)}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default HeroSectionItem;
