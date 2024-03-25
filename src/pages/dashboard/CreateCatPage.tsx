import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

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
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<CreateCatFormType>({
    resolver: zodResolver(CreateCatSchema),
  });

  const onSubmit: SubmitHandler<CreateCatFormType> = async (data) => {
    console.log(data);
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
            className="w-full text-lg"
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCatPage;
