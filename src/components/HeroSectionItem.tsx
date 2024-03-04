import { shortenText } from "@/lib/utils";
import { Link } from "react-router-dom";

interface HeroSectionItemProps {
  image: string;
  title: string;
  category: string;
  fontSize?: string;
}

const HeroSectionItem = ({
  image,
  title,
  category,
  fontSize = "text-xl md:text-3xl",
}: HeroSectionItemProps) => {
  return (
    <Link
      to={`/news/${title}`}
      className="relative block h-full w-full overflow-hidden"
    >
      {/* THUMBNAIL */}
      <div className="h-full w-full">
        {/* IMAGE */}
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="absolute inset-0 flex items-end bg-black/50 p-5  transition-all duration-700 hover:bg-black/20">
        <div className="flex flex-col gap-2">
          {/* CATEGORY */}
          <Link
            to={`/cat/${title}`}
            className="block w-fit bg-black/70  px-2 py-px text-sm capitalize tracking-wide text-white"
          >
            {category}
          </Link>
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
