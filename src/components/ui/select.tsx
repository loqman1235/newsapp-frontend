import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        className,
      )}
      {...props}
    >
      {props.children}
    </select>
  );
});

const SelectOption = forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => {
  return (
    <option ref={ref} className={cn("border-red-600", className)} {...props} />
  );
});

export { Select, SelectOption };
