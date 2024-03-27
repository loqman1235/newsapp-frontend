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
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be at not be more than 100 characters" }),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(200, {
      message: "Description must not be more than 200 characters",
    })
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content is required" })
    .min(5, { message: "Content must be at least 5 characters" }),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required" }),
});

type CreateCatFormType = z.infer<typeof CreateArticleSchema>;

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<CreateCatFormType>({
    resolver: zodResolver(CreateArticleSchema),
  });

  const onEditorChange = (editorState: string) => {
    setValue("content", editorState);
  };

  const editorContent = watch("content");

  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  const onSubmit: SubmitHandler<CreateCatFormType> = async (data) => {
    console.log(typeof data.title);
    return;
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
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Create Article</h2>

      <div className="w-full bg-background p-5 shadow">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              {...register("title")}
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title"
              className={errors.title && "border-red-700"}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-700">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              name="description"
              id="description"
              placeholder="Enter a brief description"
              rows={2}
              className={errors.title && "border-red-700"}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-700">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={onEditorChange}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote"],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ direction: "rtl" }],
                  [{ size: ["small", false, "large", "huge"] }],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  ["clean"],
                  ["link", "image", "video"],
                ],
              }}
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-700">
                {errors.content.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="flex w-1/2 items-center justify-center gap-2 text-lg"
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

export default CreateArticlePage;
