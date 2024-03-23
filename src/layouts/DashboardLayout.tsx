import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/admin/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="font-poppins">
      <DashboardSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
