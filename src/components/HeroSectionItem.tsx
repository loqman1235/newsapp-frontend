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
    <Link to={`/news/${title}`} className="relative block w-full">
      {/* THUMBNAIL */}
      <div>
        {/* IMAGE */}
        <img src={image} alt={title} className="w-full object-cover" />
      </div>

      <div className="absolute inset-0 flex items-end bg-gradient-to-b from-transparent to-black p-5  ">
        <div className="flex flex-col gap-2">
          {/* TITLE */}
          <h1 className={`font-mono font-bold text-white ${fontSize}`}>
            {title}
          </h1>
          {/* CATEGORY */}
          <Link
            to={`/cat/${title}`}
            className="relative block pl-3 text-sm uppercase tracking-wide text-white before:absolute before:left-0 before:top-1/2 before:h-2/3 before:w-0.5 before:-translate-y-1/2 before:bg-red-500 before:content-[''] hover:underline"
          >
            {category}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default HeroSectionItem;
