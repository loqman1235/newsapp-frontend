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
import LatestNewsPage from "./pages/LatestNewsPage";
// import PostPage from "./pages/PostPage";
import CategoryPage from "./pages/CategoryPage";
import PostPage from "./pages/PostPage";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
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
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:catSlug" element={<CategoryPage />} />
        <Route path="category/:catSlug/:postSlug" element={<PostPage />} />
        <Route path="latest" element={<LatestNewsPage />} />
      </Route>

      {/* AUTH  */}
      <Route
        path="/sign-in"
        element={isAuth ? <Navigate to="/" /> : <SignInPage />}
      />
      <Route
        path="/sign-up"
        element={isAuth ? <Navigate to="/" /> : <SignUpPage />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={isAuth ? <DashboardLayout /> : <Navigate to="/sign-in" />}
      >
        <Route index element={<p>Dashboard homepage</p>} />
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
