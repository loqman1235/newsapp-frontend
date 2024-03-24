import Card from "@/components/admin/Card";
import { Hourglass, LayoutList, Newspaper, Users } from "lucide-react";

const Homepage = () => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Dashboard</h2>
      {/* CARDS */}
      <div className="grid h-20 w-full grid-cols-1 gap-5 md:grid-cols-3 ">
        <Card
          label="Users"
          icon={<Users className="h-6 w-6" />}
          total={0}
          mode="large"
        />
        <Card
          label="Articles"
          icon={<Newspaper className="h-6 w-6" />}
          total={0}
          mode="large"
        />
        <Card
          label="Categories"
          icon={<LayoutList className="h-6 w-6" />}
          total={0}
          mode="large"
        />
        <Card
          label="Pending Users"
          icon={<Hourglass className="h-6 w-6" />}
          total={0}
          mode="large"
        />
        <Card
          label="Pending Articles"
          icon={<Hourglass className="h-6 w-6" />}
          total={0}
          mode="large"
        />
        <Card
          label="Pending Categories"
          icon={<Hourglass className="h-6 w-6" />}
          total={0}
          mode="large"
        />
      </div>
    </div>
  );
};

export default Homepage;
