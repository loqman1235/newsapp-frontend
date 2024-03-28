import { cn } from "@/lib/utils";

const Select = ({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className={cn(
        "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        className,
      )}
      {...props}
    >
      {props.children}
    </select>
  );
};

const SelectOption = ({
  className,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return <option className={cn("border-red-600", className)} {...props} />;
};

export { Select, SelectOption };
