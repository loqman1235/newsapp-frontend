import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Post from "./Post";

const MustReadSection = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Must Read</h2>
        <Link
          to="/news"
          className="flex items-center gap-2 font-medium text-red-600"
        >
          See All <FaArrowRightLong />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:h-[400px] md:grid-cols-2 lg:grid-cols-2">
        <Post />

        <div className="grid grid-cols-2 gap-5">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </section>
  );
};

export default MustReadSection;
