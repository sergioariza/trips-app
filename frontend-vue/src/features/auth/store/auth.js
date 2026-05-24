import { defineStore } from "pinia";
import { loginRequest, registerRequest } from "../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token")
  }),
  actions: {
    async login(email, password) {
      try {
        const res = await loginRequest(email, password);

        this.token = res.data.token;
        this.user = res.data.user;

        localStorage.setItem("token", this.token);
      } catch (err) {
        throw new Error(err.response?.data?.message || "Invalid email or password");
      }
    },
    async register(email, password) {
      await registerRequest(email, password);

      // optional: log in immediately after registration
      await this.login(email, password);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    }
  }
});
