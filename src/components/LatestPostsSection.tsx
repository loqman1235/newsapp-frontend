import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Post from "./Post";

const LatestPostsSection = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Latest News</h2>
        <Link
          to="/news"
          className="flex items-center gap-2 font-medium text-red-600"
        >
          See All <FaArrowRightLong />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </section>
  );
};

export default LatestPostsSection;
