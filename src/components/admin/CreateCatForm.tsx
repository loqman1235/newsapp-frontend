import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import api from "@/services/api";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Switch } from "@/components/ui/switch";

const CreateCatSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
  published: z.coerce.boolean().default(false),
});

type CreateCatFormType = z.infer<typeof CreateCatSchema>;

const CreateCatForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitted },
  } = useForm<CreateCatFormType>({
    resolver: zodResolver(CreateCatSchema),
  });

  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  const onSubmit: SubmitHandler<CreateCatFormType> = async (data) => {
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
    <form className="w-1/2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

      <div className="flex items-center space-x-2">
        <Controller
          name="published"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Switch
              id="published"
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
              value={field.value.toString()}
            />
          )}
        />
        <Label htmlFor="published">Public</Label>
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
  );
};

export default CreateCatForm;
