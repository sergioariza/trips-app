import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
  baseURL: "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    const isAuthEndpoint = err.config?.url?.includes("/auth/");
    if (err.response?.status === 401 && !isAuthEndpoint) {
      const auth = useAuthStore();
      auth.logout();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;