import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface SectionProps {
  title: string;
  href?: string;
  children: React.ReactNode;
  isPage?: boolean;
}

const Section = ({ title, href, isPage = false, children }: SectionProps) => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">{title}</h2>
        {!isPage && (
          <Link
            to={href || ""}
            className="flex items-center gap-2 text-muted-foreground transition duration-150 hover:text-foreground"
          >
            See All <FaArrowRightLong />
          </Link>
        )}
      </div>

      <div
        className={`grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ${isPage && "gap-y-5"}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
