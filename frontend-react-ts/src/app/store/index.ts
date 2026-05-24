import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/authSlice";
import tripsReducer from "../../features/trips/store/tripsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
