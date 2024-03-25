import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { logoutAsync } from "@/features/auth/authThunks";

const NavigationMenu = () => {
  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );
  const [articlesSubmenuOpen, setArticlesSubmenuOpen] = useState(false);
  const [usersSubmenuOpen, setUsersSubmenuOpen] = useState(false);
  const [categoriesSubmenuOpen, setCategoriesSubmenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleArticlesSubmenu = () => {
    setArticlesSubmenuOpen(!articlesSubmenuOpen);
  };

  const toggleUsersSubmenu = () => {
    setUsersSubmenuOpen(!usersSubmenuOpen);
  };

  const toggleCategoriesSubmenu = () => {
    setCategoriesSubmenuOpen(!categoriesSubmenuOpen);
  };

  const handleLogout = async () => {
    try {
      if (accessToken) {
        const response = await dispatch(logoutAsync({ accessToken })).unwrap();
        if (response) {
          navigate("/sign-in");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navLinkStyles =
    "flex items-center gap-5 px-5 py-3 transition duration-700 hover:bg-accent-foreground hover:text-background font-medium";
  // const activeLinkStyles =
  //   "flex items-center gap-5 px-5 py-3 transition duration-700 bg-accent-foreground text-background";
  return (
    <ul className="flex h-[calc(100vh-4rem)] w-full flex-col">
      <li>
        <Link to="/dashboard" className={navLinkStyles}>
          {" "}
          <span>
            <LayoutDashboard className="h-5 w-5" />
          </span>
          <span className="hidden md:block">Dashboard</span>
        </Link>
      </li>

      <li className="group" onClick={toggleArticlesSubmenu}>
        <Link to="/dashboard/articles" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <Newspaper className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Articles</span>
          </div>
          <button
            className={`hidden transition duration-300 md:block ${articlesSubmenuOpen && "rotate-180"}`}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </Link>

        <ul
          onClick={(e) => e.stopPropagation()}
          className={`hidden max-h-0 flex-col gap-1 overflow-hidden text-sm text-muted-foreground transition-all duration-300 ease-in-out md:flex ${articlesSubmenuOpen && "max-h-96"}`}
        >
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              All
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/draft"
              className={`${navLinkStyles} pl-[60px]`}
            >
              Drafts
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/articles/create"
              className={`${navLinkStyles} pl-[60px]`}
            >
              Create
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Edit
            </Link>
          </li>
        </ul>
      </li>

      <li className="group" onClick={toggleCategoriesSubmenu}>
        <Link to="/dashboard/categories" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <LayoutList className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Categories</span>
          </div>
          <button
            className={`hidden transition duration-300 md:block ${categoriesSubmenuOpen && "rotate-180"}`}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </Link>

        <ul
          onClick={(e) => e.stopPropagation()}
          className={`hidden max-h-0 flex-col gap-1 overflow-hidden text-sm text-muted-foreground transition-all duration-300 ease-in-out md:flex ${categoriesSubmenuOpen && "max-h-96"}`}
        >
          <li>
            <Link
              to="/dashboard/categories"
              className={`${navLinkStyles} pl-[60px]`}
            >
              All
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Drafts
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/categories/create"
              className={`${navLinkStyles} pl-[60px]`}
            >
              Create
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Edit
            </Link>
          </li>
        </ul>
      </li>

      <li className="group" onClick={toggleUsersSubmenu}>
        <Link to="/users" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <Users className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Users</span>
          </div>
          <button
            className={`hidden transition duration-300 md:block ${usersSubmenuOpen && "rotate-180"}`}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </Link>

        <ul
          onClick={(e) => e.stopPropagation()}
          className={`hidden max-h-0 flex-col gap-1 overflow-hidden text-sm text-muted-foreground transition-all duration-300 ease-in-out md:flex ${usersSubmenuOpen && "max-h-96"}`}
        >
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              All
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Pending Approvals
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Create a user
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Edit a user
            </Link>
          </li>
        </ul>
      </li>

      <li>
        <Link to="/dashboard" className={navLinkStyles}>
          {" "}
          <span>
            <Settings className="h-5 w-5" />
          </span>
          <span className="hidden md:block">Settings</span>
        </Link>
      </li>

      {/* LOGOUT */}
      <li className="mt-auto">
        <button onClick={handleLogout} className={`w-full ${navLinkStyles}`}>
          {" "}
          <span>
            <LogOut className="h-5 w-5" />
          </span>
          <span className="hidden md:block">Sign Out</span>
        </button>
      </li>
    </ul>
  );
};

export default NavigationMenu;
