// import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  return (
    <div>
      <Header />
      {/* <BreakingNewsBar /> */}

      <Outlet />

      <Footer />
      <ToastContainer closeOnClick hideProgressBar theme="colored" />
    </div>
  );
};

export default AppLayout;
