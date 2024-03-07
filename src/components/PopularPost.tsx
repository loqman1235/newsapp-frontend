import { Link } from "react-router-dom";

const PopularPost = () => {
  return (
    <div className="flex items-center gap-3 border-b border-muted-foreground/20 pb-5">
      <div className="h-[60px] w-[80px] overflow-hidden">
        <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/122E0/production/_132746447_gettyimages-1299543321-1.jpg.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-[calc(100%-80px)]">
        <Link
          to="/"
          className="mb-3 block font-mono text-lg font-bold leading-tight transition duration-500 hover:text-red-600"
        >
          Tech Giants Unveil Breakthrough AI ...
        </Link>
      </div>
    </div>
  );
};

export default PopularPost;
