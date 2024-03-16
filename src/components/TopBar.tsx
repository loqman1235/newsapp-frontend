import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";

const TopBar = () => {
  const { isAuth, user } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );
  return (
    <nav className="w-full bg-foreground py-2.5">
      <div className="container flex max-w-6xl items-center justify-between">
        {/* SOCIAL LINKS */}
        <ul className="flex items-center gap-5">
          <li className="text-muted/60 transition hover:text-primary-foreground">
            <a href="https://www.facebook.com/" target="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li className="text-muted/60 transition hover:text-primary-foreground">
            <a href="https://www.x.com/" target="_blank">
              <FaXTwitter />
            </a>
          </li>
          <li className="text-muted/60 transition hover:text-primary-foreground">
            <a href="https://www.youtube.com/" target="_blank">
              <FaYoutube />
            </a>
          </li>

          <li className="text-muted/60 transition hover:text-primary-foreground">
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagram />
            </a>
          </li>
        </ul>

        <ul className="flex items-center gap-5">
          <li className="hidden  text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground md:block">
            <Link to={`/about`}>About</Link>
          </li>
          <li className="hidden  text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground md:block">
            <Link to={`/Contact`}>Contact</Link>
          </li>
          {isAuth ? (
            <>
              <li className="text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground md:block">
                <Link to={`/profile`}>{user?.name}</Link>
              </li>
              <li className="text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground md:block">
                <Link to={`/profile`} className="flex items-center gap-2">
                  Logout <LogOut className="h-4 w-4" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground md:block">
                <Link to={`/sign-up`}>Sign Up</Link>
              </li>
              <li className="text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground md:block">
                <Link to={`/sign-in`}>Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
