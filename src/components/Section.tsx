import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface SectionProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

const Section = ({ title, href, children }: SectionProps) => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">{title}</h2>
        <Link
          to={href}
          className="flex items-center gap-2 font-medium text-red-600"
        >
          See All <FaArrowRightLong />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
};

export default Section;
