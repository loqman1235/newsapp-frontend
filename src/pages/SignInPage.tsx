import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { loginThunk } from "@/services/authService";
import { AppDispatch } from "@/app/store";

const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is not a valid email" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

type SignInFormType = z.infer<typeof SignInSchema>;

const SignInPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({ resolver: zodResolver(SignInSchema) });
  const [isPassShown, setIsPassShown] = useState(false);

  const toggleShowPassword = () => setIsPassShown((prev) => !prev);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
    try {
      const response = await dispatch(loginThunk(data));

      if (loginThunk.fulfilled.match(response)) {
        reset();
        navigate("/");
      }

      if (loginThunk.rejected.match(response)) {
        setError("root", {
          type: "custom",
          message: response.payload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-10 flex w-full items-center justify-center md:max-w-6xl">
        <div className="w-full rounded bg-background p-5 shadow-2xl md:w-1/2">
          <h2 className="mb-5 font-mono text-2xl font-bold tracking-tight">
            Sign In
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className={errors.email && "border-red-700"}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-700">
                  {errors.email.message}
                </p>
              )}
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
                  {...register("password")}
                  type={isPassShown ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`pr-10 ${errors.password && "border-red-700"}`}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-700">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Root error */}
            {errors.root && (
              <p className="mt-2 text-sm text-red-700">{errors.root.message}</p>
            )}

            <p>
              Don't have an account?{" "}
              <Link className="font-bold underline" to="/sign-up">
                Sign Up
              </Link>
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="default"
              size="lg"
              className="w-full text-lg"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
