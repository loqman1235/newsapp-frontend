import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="flex w-full flex-col gap-5 overflow-hidden">
      {/* THUMBNAIL */}
      <Link
        to="/"
        className="group relative block h-[240px] w-full overflow-hidden bg-slate-300"
      >
        <img
          src="https://ichef.bbci.co.uk/news/976/cpsprodpb/122E0/production/_132746447_gettyimages-1299543321-1.jpg.webp"
          alt="title"
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:rotate-12 group-hover:scale-150"
        />

        <Link
          to="/"
          className="absolute bottom-2 left-2 block w-fit bg-red-600  px-2 py-px text-sm capitalize tracking-wide text-white"
        >
          Sport
        </Link>
      </Link>
      <div>
        <Link
          to="/"
          className="mb-3 block font-mono text-xl font-bold leading-tight transition duration-500 hover:text-red-600"
        >
          Tech Giants Unveil Breakthrough AI...
        </Link>
        <ul className="flex items-center gap-4 text-sm">
          <li className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" /> Feb 15, 2022
          </li>
          <li className="h-1 w-1 rounded-full bg-muted-foreground/60"></li>
          <li className="flex items-center gap-1 text-muted-foreground">
            <User className="h-4 w-4" />{" "}
            <Link to="/" className="hover:underline">
              John Doe
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Post;
