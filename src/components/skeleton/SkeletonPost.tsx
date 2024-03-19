import { Skeleton } from "../ui/skeleton";

interface PostProps {
  mode: "large" | "small";
}

const SkeletonPost = ({ mode = "large" }: PostProps) => {
  if (mode === "large") {
    return (
      <div className="mb-5 flex w-full flex-col gap-5 overflow-hidden md:mb-0">
        {/* THUMBNAIL */}
        <div className="group relative block h-[220px] w-full overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative flex w-full items-start gap-3 overflow-hidden pt-5">
        {/* THUMBNAIL */}
        <div className="block h-20 w-20 overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="flex h-full w-[calc(100%-80px)] flex-col gap-2">
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    );
  }
};

export default SkeletonPost;
