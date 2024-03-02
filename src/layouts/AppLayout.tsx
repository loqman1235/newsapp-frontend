import Navbar from "@/components/Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
