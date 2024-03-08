import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Header />
      <BreakingNewsBar />

      {children}

      <Footer />
    </div>
  );
};

export default AppLayout;
