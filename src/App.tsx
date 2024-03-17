import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  refreshTokenAsync,
  verifyTokenAsync,
} from "./features/auth/authThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, accessToken } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth,
  );

  const location = useLocation();

  useEffect(() => {
    if (accessToken) {
      dispatch(verifyTokenAsync({ accessToken }));
    }
  }, [accessToken, dispatch, location.pathname]);

  useEffect(() => {
    // Refresh token every 1 minute
    const intervalId = setInterval(() => {
      if (isAuth) {
        dispatch(refreshTokenAsync());
      }
    }, 840000);

    return () => clearInterval(intervalId);
  }, [isAuth, dispatch]);

  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/sign-in"
          element={isAuth ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route
          path="/sign-up"
          element={isAuth ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
    </AppLayout>
  );
};

export default App;
