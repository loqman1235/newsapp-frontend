import { ClipLoader } from "react-spinners";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectOption } from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";
import { ArrowUpFromLine, Image } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICategory } from "@/types";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ReactQuill from "react-quill";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/atom-one-dark.css";

// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

const EditArticleSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .trim()
    .optional()
    .nullable()
    .refine((desc) => !desc || desc.length >= 10, {
      message: "Description must be at least 10 characters",
    }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content is required" })
    .min(5, { message: "Content must be at least 5 characters" }),
  published: z.coerce.boolean().default(false),
  thumbnail: z.any().optional().nullable(),
  categories: z.array(z.string()).min(1, { message: "Category is required" }),
});

type UpdateArticleFormType = z.infer<typeof EditArticleSchema>;

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"],
    ],
  },
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

const EditArticleForm = () => {
  const { artSlug } = useParams();
  const { data: artResult } = useFetch("/posts", artSlug);

  const { data: categoriesResult } = useFetch("/cats");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateArticleFormType>({
    resolver: zodResolver(EditArticleSchema),
  });

  const { accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  const onSubmit: SubmitHandler<UpdateArticleFormType> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("content", data.content);
    formData.append("published", data.published.toString());

    // Only append thumbnail if it exists and is a file
    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", (data.thumbnail as Blob[])[0]);
    }

    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });

    try {
      const res = await api.patch(`/posts/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
        reset();
        navigate("/dashboard/articles");
        toast.success("Article updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (artResult && artResult.post) {
      setThumbnailPreview(artResult.post.thumbnail.url);
      reset({
        id: artResult.post.id,
        title: artResult.post.title,
        description: artResult.post.description,
        content: artResult.post.content,
        categories: artResult.post.categories.map(
          (category: ICategory) => category.id,
        ),
        published: artResult.post.published,
      });
    }
  }, [artResult, reset]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("id")} />
      <div className="flex flex-col-reverse items-start gap-10 md:flex-row">
        <div className="w-full space-y-4 md:w-[70%]">
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
              className={errors.description && "border-red-700"}
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
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  className={`w-full bg-background ${
                    errors.content && "border border-red-700"
                  }`}
                  modules={modules}
                  formats={formats}
                  {...field}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              )}
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
            <Select
              {...register("categories")}
              id="cat"
              multiple
              className={errors.categories && "border-red-700"}
            >
              {categoriesResult &&
                categoriesResult.categories &&
                categoriesResult.categories.length > 0 &&
                categoriesResult.categories.map((cat: ICategory) => (
                  <SelectOption key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectOption>
                ))}
            </Select>
            {errors.categories && (
              <p className="mt-2 text-sm text-red-700">
                {errors.categories.message}
              </p>
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
        </div>

        {/* THUMBNAIL PREVIEW and UPLOAD */}
        <div className="w-full md:w-[30%]">
          {thumbnailPreview ? (
            <div className="mb-2 flex h-[200px] items-center justify-center overflow-hidden rounded bg-black/10 text-foreground/15">
              <img
                src={thumbnailPreview}
                alt="thumbnail"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="mb-2 flex h-[200px] items-center justify-center overflow-hidden rounded bg-black/10 text-foreground/15">
              <Image className="h-10 w-10" />
            </div>
          )}
          <label
            htmlFor="thumbnail"
            className="flex w-full cursor-pointer items-center justify-center rounded border border-muted-foreground/20 bg-background p-3 font-semibold text-muted-foreground shadow-sm"
          >
            <div className="space-y-2">
              <Input
                {...register("thumbnail", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const result = reader.result as string;
                      URL.revokeObjectURL(result); // Prevent memory leaks
                      setThumbnailPreview(result);
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  },
                })}
                type="file"
                id="thumbnail"
                name="thumbnail"
                className="hidden"
              />
            </div>

            <span className="flex items-center justify-center gap-2">
              <ArrowUpFromLine className="h-5 w-5" /> Upload thumbnail
            </span>
          </label>
          {errors.thumbnail && (
            <p className="mt-2 text-sm text-red-700">
              {errors.thumbnail.message as string}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="mt-4 flex w-full items-center justify-center gap-2 text-lg md:w-[30%]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
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

export default EditArticleForm;
