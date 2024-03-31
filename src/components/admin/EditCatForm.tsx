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
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";

const EditCatSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
  published: z.boolean(),
});

type EditCatFormType = z.infer<typeof EditCatSchema>;

const EditCatForm = () => {
  const { catSlug } = useParams();
  const { data: categoryResult } = useFetch(`/cats/${catSlug}`);
  const [catId, setCatId] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<EditCatFormType>({
    resolver: zodResolver(EditCatSchema),
  });

  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  useEffect(() => {
    if (categoryResult && categoryResult.category) {
      setCatId(categoryResult.category.id);
      setIsPublished(categoryResult.category.published);
      reset({
        name: categoryResult.category.name,
        published: categoryResult.category.published,
      });
    }
  }, [categoryResult, reset]);

  const onSubmit: SubmitHandler<EditCatFormType> = async (data) => {
    data = { ...data, published: isPublished };

    try {
      const res = await api.patch(`/cats/${catId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 200) {
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
        <Switch
          id="published"
          name="published"
          onCheckedChange={() => setIsPublished(!isPublished)}
          checked={isPublished}
        />
        <Label htmlFor="published">Published</Label>
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
            <span>Updating...</span>
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

export default EditCatForm;
