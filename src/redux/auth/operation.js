import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
console.log("Base URL:", axios.defaults.baseURL);


export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      clearAuthHeader();
      console.log("Register credentials:", credentials);
      console.log("Base URL:", axios.defaults.baseURL);
      const response = await axios.post("/users/signup", credentials);
      return response.data;
    } catch (error) {
      console.error("Register error response:", error.response);
      console.error("Register error data:", error.response?.data);
      console.error("Register error status:", error.response?.status);
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Bir hata oluştu. Lütfen tekrar deneyin.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      const token = response.data.token;
      setAuthHeader(token);
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    localStorage.removeItem("token");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
