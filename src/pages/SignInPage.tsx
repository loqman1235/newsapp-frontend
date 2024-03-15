import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [isPassShown, setIsPassShown] = useState(false);

  const toggleShowPassword = () => setIsPassShown((prev) => !prev);

  return (
    <div className="container my-10 flex w-full items-center justify-center md:max-w-6xl">
      <div className="w-full rounded bg-background p-5 shadow-2xl md:w-1/2">
        <h2 className="mb-5 font-mono text-2xl font-bold tracking-tight">
          Sign In
        </h2>

        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative w-full">
              <button
                onClick={toggleShowPassword}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {isPassShown ? (
                  <EyeOff className="h-5 w-5 " />
                ) : (
                  <Eye className="h-5 w-5 " />
                )}
              </button>
              <Input
                type={isPassShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="pr-10"
              />
            </div>
          </div>

          <p>
            Don't have an account?{" "}
            <Link className="font-bold underline" to="/sign-up">
              Sign Up
            </Link>
          </p>
          <Button variant="default" size="lg" className="w-full text-lg">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
