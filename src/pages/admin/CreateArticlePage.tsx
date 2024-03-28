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
import { ArrowUpFromLine, Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

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
  const [isPublished, setIsPublished] = useState(false);
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

      <div className="flex flex-col-reverse items-start gap-10 md:flex-row">
        <form
          className="w-full space-y-4 md:w-[70%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor="title">
              Title <span className="text-red-700">*</span>
            </Label>
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
            <Label htmlFor="content">
              Content <span className="text-red-700">*</span>
            </Label>

            <ReactQuill
              id="content"
              className={`bg-background ${errors.content && "border border-red-700"}`}
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

          <div>
            <Label htmlFor="cat">
              Category <span className="text-red-700">*</span>
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent id="cat">
                <SelectItem value="politics">politics</SelectItem>
                <SelectItem value="culture">culture</SelectItem>
                <SelectItem value="sports">sports</SelectItem>
              </SelectContent>
            </Select>
            {errors.description && (
              <p className="mt-2 text-sm text-red-700">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              name="published"
              onCheckedChange={() => setIsPublished(!isPublished)}
              checked={isPublished}
            />
            <Label htmlFor="published">Public</Label>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="flex w-full items-center justify-center gap-2 text-lg md:w-[30%]"
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

        <div className="w-full md:w-[30%]">
          <div className="mb-2 flex h-[200px] items-center justify-center overflow-hidden rounded bg-black/10 text-foreground/15">
            <Image className="h-10 w-10" />
          </div>
          <label
            htmlFor="thumbnail"
            className="flex w-full cursor-pointer items-center justify-center rounded border border-muted-foreground/20 bg-background p-3 font-semibold text-muted-foreground shadow-sm"
          >
            <input
              type="file"
              className="hidden"
              id="thumbnail"
              name="thumbnail"
            />
            <span className="flex items-center justify-center gap-2">
              <ArrowUpFromLine className="h-5 w-5" /> Upload thumbnail
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateArticlePage;
