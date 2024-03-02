import { Link } from "react-router-dom";

const navLinks = [
  "Home",
  "News",
  "Politics",
  "Business",
  "Sports",
  "Entertainment",
] as const;

const Navbar = () => {
  return (
    <div className="w-full px-10">
      <div className="w-full flex items-center justify-between py-4 border-b border-slate-300">
        {/* BRAND  */}
        <Link
          to="/"
          className="text-3xl font-playfair tracking-tight font-black"
        >
          Voxium.
        </Link>

        {/* CTAs */}

        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-xl tracking-tight font-medium capitalize"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-xl tracking-tight font-medium bg-slate-900 text-white px-4 py-2 rounded-sm hover:bg-slate-800 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <nav className="w-full flex items-center justify-between py-4">
        <ul className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li
              key={link}
              className={`text-lg tracking-tight font-medium hover:text-slate-900 transition ${
                link === "Home" ? "text-slate-900" : "text-slate-500"
              }`}
            >
              <Link to={`/${link.toLowerCase()}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
