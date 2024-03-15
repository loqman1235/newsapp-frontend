import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { FaChevronDown, FaMagnifyingGlass } from "react-icons/fa6";
import HamburgerBtn from "./HamburgerBtn";
import { useState } from "react";

const navLinks = [
  "Home",
  "News",
  "Politics",
  "Business",
  "Sports",
  "Health",
  "Tech",
  "Science",
] as const;
const NavigationBar = () => {
  const [navMenuActive, setNavMenuActive] = useState(false);

  const toggleNavMenu = () => {
    setNavMenuActive((prev) => !prev);
  };

  return (
    <>
      <nav className="h-14 w-full bg-background">
        <div className="container flex h-full max-w-6xl items-center justify-between gap-5">
          <ul className="hidden h-full items-center md:flex">
            {/* Display only the first 4 links */}
            {navLinks.slice(0, 5).map((link) => (
              <li
                key={link}
                className={`h-full px-5 text-base font-medium transition first:pl-0 last:border-none last:pr-0 hover:text-slate-900 ${
                  link === "Home"
                    ? "relative font-semibold text-slate-900 before:absolute before:bottom-0 before:left-0 before:h-[4px] before:w-full before:rounded-full before:bg-slate-300"
                    : "text-muted-foreground"
                }`}
              >
                <Link
                  className="flex h-full items-center"
                  to={`/${link.toLowerCase()}`}
                >
                  {link}
                </Link>
              </li>
            ))}

            {/* More Button */}

            <li className="h-full px-5 text-base font-medium text-slate-500 transition first:pl-0 last:border-none last:pr-0 hover:text-slate-900">
              <button
                className="flex h-full items-center gap-1"
                onClick={() => {
                  console.log("More");
                }}
              >
                More <FaChevronDown size={12} />
              </button>
            </li>
          </ul>

          <HamburgerBtn menuActive={navMenuActive} onClick={toggleNavMenu} />

          <form className="relative w-3/4 md:w-2/5">
            <Input placeholder="Search..." className=" rounded-full pl-5" />

            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-600">
              <FaMagnifyingGlass />
            </button>
          </form>
        </div>
      </nav>

      {/* NAVIGATION MENU MOBILE */}

      <div
        className={`relative z-30 h-0 w-full origin-top-left scale-y-0 bg-background transition-all duration-300 ease-out md:hidden ${navMenuActive && "h-auto scale-y-100"} delay-75`}
      >
        <ul className="grid grid-cols-4 grid-rows-2 gap-5 p-8">
          {navLinks.map((link) => (
            <li
              key={link}
              className="text-base font-medium text-muted-foreground transition hover:text-foreground"
            >
              <Link to={`/${link.toLowerCase()}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavigationBar;
