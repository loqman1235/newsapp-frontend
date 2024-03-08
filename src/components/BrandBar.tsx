import { Link } from "react-router-dom";

const BrandBar = () => {
  return (
    <div className="w-full bg-background py-2">
      <div className="container flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        {/* BRAND */}
        <Link
          to="/"
          className="w-fit font-mono text-4xl font-black tracking-tight"
        >
          Voxium.
        </Link>

        {/* ADVERTISMENT*/}
        <div className="h-[90px] w-full bg-slate-300 p-8 text-center text-sm md:w-[720px]">
          <p className="text-slate-500">720x90 ad</p>
        </div>
      </div>
    </div>
  );
};

export default BrandBar;
