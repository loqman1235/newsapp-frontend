import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-in"
          element={isAuthenticated ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
    </AppLayout>
  );
};

export default App;
