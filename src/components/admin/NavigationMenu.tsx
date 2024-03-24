import { Link } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";

const NavigationMenu = () => {
  const navLinkStyles =
    "flex items-center gap-5 px-5 py-3 transition duration-300 hover:bg-accent-foreground hover:text-background font-medium";
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

      <li className="group">
        <Link to="/dashboard" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <Newspaper className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Articles</span>
          </div>
          <button className="hidden transition duration-300 group-hover:rotate-180 md:block">
            <ChevronDown className="h-5 w-5" />
          </button>
        </Link>

        <ul className="hidden max-h-0 flex-col gap-1 overflow-hidden text-sm text-muted-foreground transition-all duration-500 ease-in-out group-hover:max-h-[200px] md:flex">
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
              to="/dashboard/create"
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

      <li className="group">
        <Link to="/dashboard" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <LayoutList className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Categories</span>
          </div>
          <button className="hidden transition duration-300 group-hover:rotate-180 md:block">
            <ChevronDown className="h-5 w-5" />
          </button>
        </Link>

        <ul className="hidden max-h-0 flex-col gap-1 overflow-hidden text-sm text-muted-foreground transition-all duration-500 ease-in-out group-hover:max-h-[200px] md:flex">
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              All
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
              Drafts
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`${navLinkStyles} pl-[60px]`}>
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

      <li className="group">
        <Link to="/dashboard" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <Users className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Users</span>
          </div>
          <button className="hidden transition duration-300 group-hover:rotate-180 md:block">
            <ChevronDown className="h-5 w-5" />
          </button>
        </Link>

        <ul className="hidden max-h-0 flex-col gap-1 overflow-hidden text-sm text-muted-foreground transition-all duration-500 ease-in-out group-hover:max-h-[200px] md:flex">
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
        <Link to="/dashboard" className={navLinkStyles}>
          {" "}
          <span>
            <LogOut className="h-5 w-5" />
          </span>
          <span className="hidden md:block">Sign Out</span>
        </Link>
      </li>
    </ul>
  );
};

export default NavigationMenu;
