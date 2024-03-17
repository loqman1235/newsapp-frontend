import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthState } from "./authSlice";
import api from "@/services/api";

// Login Thunk
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", data);

      const { accessToken, user } = response.data;
      // // set token and user in local storage
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("user", JSON.stringify(user));

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
          return rejectWithValue(
            "Unable to connect to the server! Please check your internet connection and try again later.",
          );
        }

        console.log(error.response?.data.message);
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

// Verify Token Thunk
export const verifyTokenAsync = createAsyncThunk(
  "auth/verify",
  async (
    { accessToken }: { accessToken: string },
    { getState, rejectWithValue },
  ) => {
    const state = getState() as { auth: AuthState };
    if (!accessToken) {
      state.auth.isAuth = false;
      state.auth.user = null;

      return rejectWithValue("Access token is missing");
    }

    try {
      const response = await api.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const isValidToken = response.data.isValid;

      if (!isValidToken) {
        state.auth.isAuth = false;
        state.auth.user = null;
        return rejectWithValue("Access token is invalid");
      }

      state.auth.isAuth = true;

      console.log(response.data, "verifying token");

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

// Refresh Token Thunk
export const refreshTokenAsync = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };

    try {
      const response = await api.post(
        "/auth/refresh-token",
        {},
        {
          withCredentials: true,
        },
      );

      if (!response.data.accessToken) {
        state.auth.isAuth = false;
        state.auth.user = null;
        return rejectWithValue("Access token is missing");
      }

      // set token and user in local storage
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken),
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Token has been refreshed");

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);

// Logout Thunk
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (
    { accessToken }: { accessToken: string },
    { getState, rejectWithValue },
  ) => {
    const state = getState() as { auth: AuthState };

    if (!accessToken) {
      state.auth.isAuth = false;
      state.auth.user = null;
    }

    try {
      const response = await api.post(
        "/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        return rejectWithValue(error.response?.data.message);
      }
    }
  },
);
