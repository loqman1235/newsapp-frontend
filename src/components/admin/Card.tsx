interface CardProps {
  label: string;
  total: number;
  icon: JSX.Element;
  bgColor?: string;
  mode?: "large" | "small";
}

const Card = ({
  label,
  total,
  icon,
  bgColor = "bg-foreground",
  mode = "small",
}: CardProps) => {
  if (mode === "small") {
    return (
      <div className="flex min-h-16 w-full items-center overflow-hidden rounded bg-background shadow">
        <div
          className={`flex h-full w-[30%] items-center justify-center text-background ${bgColor}`}
        >
          {icon}
        </div>
        <div className="flex w-[70%] flex-col items-start p-3">
          <span className="text-sm uppercase text-muted-foreground">
            {label}
          </span>
          <span className="text-2xl font-bold tracking-tight">
            {Number(total)}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" w-full  rounded bg-background px-5 py-3 shadow-md">
        <div className="flex flex-col items-start gap-2">
          <span className="text-muted-foreground">{icon}</span>
          <p className="text-2xl font-bold tracking-tight">{Number(total)}</p>
          <p className="text-sm uppercase text-muted-foreground">{label}</p>
        </div>
      </div>
    );
  }
};

export default Card;
