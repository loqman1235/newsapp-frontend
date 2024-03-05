import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="w-full">
      {/* THUMBNAIL */}
      <Link
        to="/"
        className="mb-5 block h-[200px] w-full overflow-hidden rounded-md bg-slate-300"
      >
        <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/122E0/production/_132746447_gettyimages-1299543321-1.jpg.webp"
          alt="title"
          className="h-full w-full object-cover"
        />
      </Link>
      <Link
        to="/"
        className="mb-3 block font-mono text-xl font-bold leading-tight transition duration-500 hover:text-red-600"
      >
        Tech Giants Unveil Breakthrough AI Technology for Sustainable Energy
        Solutions
      </Link>
      <ul className="flex items-center gap-4 text-sm">
        <li>
          <Link
            to="/"
            className="font-medium text-red-600 transition duration-500 hover:text-red-800"
          >
            Sport
          </Link>
        </li>
        <li className="h-1 w-1 rounded-full bg-muted-foreground/60"></li>
        <li className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-4 w-4" /> Feb 15, 2022
        </li>
      </ul>
    </div>
  );
};

export default Post;
