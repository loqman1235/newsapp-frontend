interface HamburgerBtnProps {
  menuActive: boolean;
  onClick: () => void;
  props?: React.HTMLAttributes<HTMLButtonElement>;
}

const HamburgerBtn = ({ menuActive, ...props }: HamburgerBtnProps) => {
  const lineStyles = "h-0.5 w-5 bg-foreground transition duration-300 ease-out";

  const topLineActive = "rotate-45 translate-y-[6px]";
  const centerLineActive = "opacity-0 -translate-x-2";
  const bottomLineActive = "-rotate-45 -translate-y-[6px]";

  return (
    <button
      className="flex flex-col items-center justify-center gap-1 text-foreground md:hidden"
      onClick={props?.onClick}
    >
      <div className={`${lineStyles} ${menuActive && topLineActive}`}></div>
      <div className={`${lineStyles} ${menuActive && centerLineActive}`}></div>
      <div className={`${lineStyles} ${menuActive && bottomLineActive}`}></div>
    </button>
  );
};

export default HamburgerBtn;
