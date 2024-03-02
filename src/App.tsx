import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
