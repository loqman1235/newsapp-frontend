import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/admin/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  return (
    <div className="relative w-full font-poppins">
      <DashboardSidebar />
      <main className="absolute right-0 min-h-screen w-[calc(100%-64px)] p-5 md:w-[calc(100%-224px)]">
        <Outlet />
      </main>

      <ToastContainer closeOnClick hideProgressBar theme="colored" />
    </div>
  );
};

export default DashboardLayout;
