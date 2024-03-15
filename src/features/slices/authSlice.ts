import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: "AUTHOR" | "MODERATOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

type AuthState = {
  user: null | UserType;
  accessToken: null | string;
  isAuthenticated: boolean;
  status: "idle" | "pending" | "succeeded" | "failed";
};

// Get user from local storage
const getStoredUser = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

const getStoredAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return JSON.parse(accessToken);
  }

  return null;
};

const initialState: AuthState = {
  user: getStoredUser(),
  accessToken: getStoredAccessToken(),
  isAuthenticated: !!getStoredAccessToken(),
  status: "idle",
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setToken(state, { payload: { accessToken, user } }) {
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.user = user;
      state.status = "succeeded";
    },
    removeToken(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.status = "succeeded";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
