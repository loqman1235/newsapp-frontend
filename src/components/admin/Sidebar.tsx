import { Link } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import { Shield } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-foreground text-muted-foreground md:w-56">
      {/* BRAND */}
      <div className="flex h-16 w-full items-center px-5">
        <Link
          to="/dashboard"
          className="flex items-center gap-5 text-xl font-bold tracking-tight text-background"
        >
          <span className="block md:hidden">
            <Shield />
          </span>
          <span className="hidden md:block">NewsApp.</span>
        </Link>
      </div>

      {/* NAVIGATION MENU */}
      <NavigationMenu />
    </aside>
  );
};

export default Sidebar;
