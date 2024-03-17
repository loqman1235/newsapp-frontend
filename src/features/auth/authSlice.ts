import { getItemFromLocalStorage } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import {
  loginAsync,
  logoutAsync,
  refreshTokenAsync,
  verifyTokenAsync,
} from "./authThunks";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: "AUTHOR" | "MODERATOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export type AuthState = {
  accessToken: string | null;
  user: null | IUser;
  isAuth: boolean;
  status: "idle" | "loading" | "failed";
};

const initialState: AuthState = {
  accessToken: getItemFromLocalStorage("accessToken"),
  user: getItemFromLocalStorage("user"),
  isAuth: !!getItemFromLocalStorage("accessToken"),
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
        state.isAuth = false;
        state.user = null;
      })
      .addCase(verifyTokenAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyTokenAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isAuth = true;
      })
      .addCase(verifyTokenAsync.rejected, (state) => {
        state.status = "failed";
        state.isAuth = false;
      })
      .addCase(refreshTokenAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(refreshTokenAsync.rejected, (state) => {
        state.status = "failed";
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.accessToken = null;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = "failed";
        state.isAuth = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
