import api from "../../../app/api";

export const loginRequest = (email, password) => api.post("/auth/login", { email, password });
export const registerRequest = (email, password) => api.post("/auth/register", { email, password });
