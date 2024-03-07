import { Link } from "react-router-dom";

interface PostProps {
  mode: "large" | "small";
}

const Post = ({ mode = "large" }: PostProps) => {
  if (mode === "large") {
    return (
      <div className="flex w-full flex-col gap-5 overflow-hidden">
        {/* THUMBNAIL */}
        <Link
          to="/"
          className="group relative block h-[220px] w-full overflow-hidden bg-slate-300"
        >
          <img
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/122E0/production/_132746447_gettyimages-1299543321-1.jpg.webp"
            alt="title"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:rotate-12 group-hover:scale-150"
          />

          <Link
            to="/"
            className="absolute left-0 top-0 block w-fit bg-black/80  px-2 py-px text-sm capitalize tracking-wide text-white"
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
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative flex w-full items-start gap-3 pt-5">
        <span className="absolute -top-5 left-0 h-px w-3/12 bg-foreground/10"></span>
        {/* THUMBNAIL */}
        <Link to="/" className="block h-20 w-20 overflow-hidden bg-slate-300">
          <img
            src="https://ichef.bbci.co.uk/news/976/cpsprodpb/122E0/production/_132746447_gettyimages-1299543321-1.jpg.webp"
            alt="title"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:rotate-12 group-hover:scale-150"
          />
        </Link>

        <div className="flex h-full w-[calc(100%-80px)] flex-col justify-between">
          <Link
            to="/"
            className="block font-mono  font-bold transition duration-500 hover:text-red-600"
          >
            Tech Giants Unveil Breakthrough AI...
          </Link>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            Feb 15, 2022
          </span>
        </div>
      </div>
    );
  }
};

export default Post;
