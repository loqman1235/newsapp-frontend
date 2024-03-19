import PopularPost from "./PopularPost";

const SideBar = () => {
  return (
    <aside className="sticky top-0">
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Popular</h2>

      <div className="flex flex-col gap-5 [&>*:last-child]:border-none [&>*:last-child]:pb-0">
        <PopularPost />
        <PopularPost />
        <PopularPost />
        <PopularPost />
        <PopularPost />
      </div>
    </aside>
  );
};

export default SideBar;
