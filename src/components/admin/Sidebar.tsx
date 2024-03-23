import {
  LayoutDashboard,
  LayoutList,
  LogOut,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyles =
    "flex items-center gap-5 px-5 py-3 transition duration-300 hover:bg-accent-foreground font-medium";
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-foreground text-muted-foreground">
      {/* BRAND */}
      <div className="flex h-16 w-full items-center px-5">
        <Link
          to="/dashboard"
          className="text-xl font-bold tracking-tight text-background"
        >
          News<span className="text-teal-300">App.</span>
        </Link>
      </div>

      {/* NAVIGATION MENU */}
      <ul className="flex h-[calc(100vh-4rem)] w-full flex-col">
        <li>
          <Link to="/dashboard" className={navLinkStyles}>
            {" "}
            <span>
              <LayoutDashboard className="h-5 w-5" />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className={navLinkStyles}>
            {" "}
            <span>
              <Newspaper className="h-5 w-5" />
            </span>
            <span>Articles</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className={navLinkStyles}>
            {" "}
            <span>
              <LayoutList className="h-5 w-5" />
            </span>
            <span>Categories</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className={navLinkStyles}>
            {" "}
            <span>
              <Users className="h-5 w-5" />
            </span>
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className={navLinkStyles}>
            {" "}
            <span>
              <Settings className="h-5 w-5" />
            </span>
            <span>Settings</span>
          </Link>
        </li>

        {/* LOGOUT */}
        <li className="mt-auto">
          <Link to="/dashboard" className={navLinkStyles}>
            {" "}
            <span>
              <LogOut className="h-5 w-5" />
            </span>
            <span>Sign Out</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
