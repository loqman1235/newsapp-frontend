import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  refreshTokenAsync,
  verifyTokenAsync,
} from "./features/auth/authThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";

// LAYOUTS IMPORT
import AppLayout from "./layouts/AppLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// PAGES IMPORT
import {
  HomePage,
  PostPage,
  SignInPage,
  SignUpPage,
  NotFound,
  LatestNewsPage,
  CategoryPage,
  DashboardHomePage,
} from "@/pages";
import CreatePostPage from "./pages/dashboard/CreatePostPage";

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
        <Route index element={<DashboardHomePage />} />
        <Route path="create" element={<CreatePostPage />} />
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
