import { getItemFromLocalStorage } from "@/lib/utils";
import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: "AUTHOR" | "MODERATOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

type AuthState = {
  accessToken: string | null;
  user: null | IUser;
  isAuth: boolean;
  status: "idle" | "loading" | "failed";
};

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
      const response = await api.post("/auth/refresh-token", _, {
        withCredentials: true,
      });

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
      });
  },
});

export default authSlice.reducer;
