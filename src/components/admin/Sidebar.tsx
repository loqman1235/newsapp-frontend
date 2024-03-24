import { Link } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

const Sidebar = () => {
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
      <NavigationMenu />
    </aside>
  );
};

export default Sidebar;
