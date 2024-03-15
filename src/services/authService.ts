import { setToken } from "@/features/slices/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { AxiosError } from "axios";

export const loginThunk = createAsyncThunk<
  { accessToken: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/signin", { email, password });
    setToken({
      accessToken: response.data.accessToken,
      user: response.data.user,
    });

    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken),
    );
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      return rejectWithValue(error.response?.data.message);
    }

    console.log(error);
    throw error;
  }
});
