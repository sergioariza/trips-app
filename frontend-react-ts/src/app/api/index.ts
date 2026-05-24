import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const isAuthEndpoint = err.config?.url?.includes("/auth/");
    if (err.response?.status === 401 && !isAuthEndpoint) {
      const { default: store } = await import("../store");
      const { logout } = await import("../../features/auth/store/authSlice");
      store.dispatch(logout());
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
