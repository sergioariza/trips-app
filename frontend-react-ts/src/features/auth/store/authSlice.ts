import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: Record<string, unknown> | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token")
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; user: Record<string, unknown> }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
