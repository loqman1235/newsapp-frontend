import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-foreground text-background">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-4">
          {/* About */}
          <div>
            <h1 className="mb-2 border-b border-muted-foreground/20 pb-2 font-mono text-xl font-bold">
              Voxium
            </h1>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
              maxime nihil rerum expedita culpa earum.
            </p>
          </div>

          {/* Links */}
          <div>
            <h1 className="mb-2 border-b border-muted-foreground/20 pb-2 font-mono text-xl font-bold">
              Links
            </h1>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h1 className="mb-2 border-b border-muted-foreground/20 pb-2 font-mono text-xl font-bold">
              Categories
            </h1>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  News
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Sports
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Technology
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Science
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Business
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Resources */}
          <div>
            <h1 className="mb-2 border-b border-muted-foreground/20 pb-2 font-mono text-xl font-bold">
              Legal Resources
            </h1>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:underline" to="/">
                  Cookie Consent
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <p className=" border-t border-muted-foreground/20  py-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Voxium. All rights reserved.
          Developed by{" "}
          <a
            className="hover:underline"
            href="https://www.facebook.com/loqman.axel.djefafla"
            target="_blank"
          >
            Loqmane Djefafla
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
