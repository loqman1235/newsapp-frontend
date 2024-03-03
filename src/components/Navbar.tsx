import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  "Home",
  "News",
  "Politics",
  "Business",
  "Sports",
  "Entertainment",
  "Tech",
  "Science",
] as const;

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between border-b border-slate-300 px-5 py-4">
        {/* BRAND  */}
        <Link to="/" className="font-mono text-3xl font-black tracking-tight">
          Voxium.
        </Link>

        {/* CTAs */}

        <div className="flex items-center gap-5">
          <Link to="/login" className="font-medium capitalize">
            Sign In
          </Link>
          <Link
            to="/register"
            className={buttonVariants({
              variant: "default",
              size: "default",
            })}
          >
            Sign Up
          </Link>
        </div>
      </div>

      <nav className="flex w-full items-center justify-between px-5 py-4">
        <ul className="flex items-center">
          {navLinks.map((link) => (
            <li
              key={link}
              className={`border-r border-r-slate-300 px-5 text-base font-medium transition first:pl-0 last:border-none last:pr-0 hover:text-slate-900 ${
                link === "Home" ? "text-slate-900" : "text-slate-500"
              }`}
            >
              <Link className="" to={`/${link.toLowerCase()}`}>
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* SEARCH */}
        <form className="flex w-full items-center justify-end">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Serach..."
              className="w-full rounded-full border border-slate-300 px-12 py-2 outline-none"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
