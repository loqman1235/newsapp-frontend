import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonPostPage = () => {
  return (
    <div className="container my-10 max-w-6xl text-start">
      <h1 className="mb-5  font-mono text-2xl font-bold">
        <Skeleton className="h-4 w-[80%]" />
      </h1>
      <div className="mb-5 text-sm text-muted-foreground">
        <Skeleton className="h-3 w-[20%]" />
      </div>
      <div className="mb-5 h-[354px] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <p className="flex flex-col gap-2 text-muted-foreground">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-[80%]" />
      </p>
    </div>
  );
};

export default SkeletonPostPage;
