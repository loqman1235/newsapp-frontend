import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const topbarLinks = ["Sign Up", "Sign In"] as const;

const TopBar = () => {
  return (
    <nav className="w-full bg-foreground py-2.5">
      <div className="container flex max-w-6xl items-center justify-between">
        <ul className="flex items-center">
          {topbarLinks.map((link) => (
            <li className="border-r border-r-primary-foreground/15 px-4 text-muted/60 transition first:pl-0 last:border-none last:pr-0 hover:text-primary-foreground">
              <Link to={`/${link.split(" ").join("-").toLowerCase()}`}>
                {link}
              </Link>
            </li>
          ))}
        </ul>

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
      </div>
    </nav>
  );
};

export default TopBar;
