import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { FaChevronDown, FaMagnifyingGlass } from "react-icons/fa6";
import HamburgerBtn from "./HamburgerBtn";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { ICategory } from "@/types";
import { Skeleton } from "./ui/skeleton";

const NavigationBar = () => {
  const [navMenuActive, setNavMenuActive] = useState(false);
  const { data: catResult, isLoading } = useFetch("/cats");
  const navListStyles =
    "flex items-center justify-center h-full px-5 text-base font-medium text-muted-foreground transition first:pl-0 last:border-none last:pr-0 hover:text-foreground";

  const toggleNavMenu = () => {
    setNavMenuActive((prev) => !prev);
  };

  return (
    <>
      <nav className="h-14 w-full bg-background">
        <div className="container flex h-full max-w-6xl items-center justify-between gap-5">
          <ul className="hidden h-full items-center md:flex">
            <li className={navListStyles}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold text-foreground" : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <Skeleton className="mr-5 h-4 w-20" />
                  </li>
                ))
              : catResult &&
                catResult.categories.length > 0 &&
                catResult.categories.slice(0, 4).map((cat: ICategory) => (
                  <li key={cat.id} className={navListStyles}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "font-bold text-foreground" : ""
                      }
                      to={`/category/${cat.slug}`}
                    >
                      {cat.name}
                    </NavLink>
                  </li>
                ))}

            {/* More Button */}

            {!isLoading && catResult.categories.length > 4 && (
              <li className={`relative ${navListStyles} group`}>
                <button
                  className="flex h-full items-center gap-1"
                  onClick={() => {
                    console.log("More");
                  }}
                >
                  More <FaChevronDown size={12} />
                </button>

                <ul className="absolute right-0 top-full z-10 flex w-56 origin-top-right scale-y-0 flex-col gap-5 rounded-md border border-slate-200 bg-background p-5 shadow-lg ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out focus:outline-none group-hover:scale-100">
                  {catResult &&
                    catResult.categories &&
                    catResult.categories.length > 0 &&
                    catResult.categories.slice(4).map((cat: ICategory) => (
                      <li key={cat.id}>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "font-bold text-foreground"
                              : "text-muted-foreground transition hover:text-foreground"
                          }
                          to={`/category/${cat.slug}`}
                        >
                          {cat.name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </li>
            )}
          </ul>

          <HamburgerBtn menuActive={navMenuActive} onClick={toggleNavMenu} />

          <form className="relative w-3/4 md:w-2/5">
            <Input placeholder="Search..." className=" rounded-full pl-5" />

            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground">
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
          <li className="text-base font-medium text-muted-foreground transition hover:text-foreground">
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-foreground" : ""
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center justify-center">
                  <Skeleton className="mr-5 h-4 w-20" />
                </li>
              ))
            : catResult &&
              catResult.categories.length > 0 &&
              catResult.categories.map((cat: ICategory) => (
                <li
                  key={cat.id}
                  className="text-base font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "font-bold text-foreground" : ""
                    }
                    to={`/category/${cat.slug}`}
                  >
                    {cat.name}
                  </NavLink>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default NavigationBar;
