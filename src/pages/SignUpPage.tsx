import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be less than 30 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is not a valid email" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

type SignUpFormType = z.infer<typeof SignUpSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({ resolver: zodResolver(SignUpSchema) });
  const [isPassShown, setIsPassShown] = useState(false);
  const toggleShowPassword = () => setIsPassShown((prev) => !prev);

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);
      if (res.status === 201) {
        reset();
        navigate("/sign-in");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="container max-w-md rounded bg-background p-5 shadow-2xl">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Username</Label>
            <Input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className={errors.name && "border-red-700"}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-700">{errors.name.message}</p>
            )}
          </div>

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
          <p>
            Already have an account?{" "}
            <Link className="font-bold underline" to="/sign-in">
              Sign In
            </Link>
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="default"
            size="lg"
            className="w-full text-lg"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
