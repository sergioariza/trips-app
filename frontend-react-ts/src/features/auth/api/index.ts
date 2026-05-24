import api from "../../../app/api";

export const loginRequest = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const registerRequest = (email: string, password: string) =>
  api.post("/auth/register", { email, password });
