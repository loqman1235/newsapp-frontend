import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/admin/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="font-poppins relative w-full">
      <DashboardSidebar />
      <main className="absolute right-0 w-[calc(100%-224px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
