import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LayoutList,
  LogOut,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { logoutAsync } from "@/features/auth/authThunks";

const NavigationMenu = () => {
  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

      <li className="group">
        <Link to="/dashboard/articles" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <Newspaper className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Articles</span>
          </div>
        </Link>
      </li>

      <li className="group">
        <Link to="/dashboard/categories" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <LayoutList className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Categories</span>
          </div>
        </Link>
      </li>

      <li className="group">
        <Link to="/users" className={navLinkStyles}>
          {" "}
          <div className="flex w-full items-center gap-5">
            <span>
              <Users className="h-5 w-5" />
            </span>
            <span className="hidden md:block">Users</span>
          </div>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/settings" className={navLinkStyles}>
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
