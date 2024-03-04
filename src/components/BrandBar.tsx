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
        <div className="w-full bg-slate-300 p-8 text-center text-sm md:w-1/2">
          <p className="text-slate-500"> Advertisement</p>
        </div>
      </div>
    </div>
  );
};

export default BrandBar;
