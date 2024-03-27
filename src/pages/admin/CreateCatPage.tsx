import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import api from "@/services/api";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const CreateCatSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
});

type CreateCatFormType = z.infer<typeof CreateCatSchema>;

const CreateCatPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<CreateCatFormType>({
    resolver: zodResolver(CreateCatSchema),
  });

  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  const onSubmit: SubmitHandler<CreateCatFormType> = async (data) => {
    console.log(typeof data.name);
    try {
      const res = await api.post("/cats", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 201) {
        console.log(res);
        reset();
        navigate("/dashboard/categories");
      }
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.details[0]?.message);
        setError("name", {
          type: "custom",
          message: error.response?.data?.details[0]?.message,
        });
      }

      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Create Category
      </h2>

      <div className="w-1/2 bg-background p-5 shadow">
        <form className=" space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              placeholder="Enter category name"
              className={errors.name && "border-red-700"}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-700">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="flex w-full items-center justify-center gap-2 text-lg"
            disabled={isSubmitted}
          >
            {isSubmitted ? (
              <>
                <ClipLoader color="rgba(255, 255, 255, 0.5)" size={20} />
                <span>Adding...</span>
              </>
            ) : (
              "Add"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCatPage;
