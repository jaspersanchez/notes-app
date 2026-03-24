import axios from "axios";
import type { LoginData, RegisterData } from "../types";

const baseURL = "http://localhost:4000/api";

// create axios instance with base url
const publicApi = axios.create({
  baseURL,
});

export const privateApi = axios.create({
  baseURL,
});

privateApi.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    config.headers.Authorization = `Bearer ${parsed.token}`;
  }
  return config;
});

export const register = (data: RegisterData) =>
  publicApi.post("/auth/register", data);

export const login = (data: LoginData) => publicApi.post("/auth/login", data);

export const getMe = () => privateApi.get("/auth/me");
