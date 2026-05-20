import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "../types";

interface TripsState {
  trips: Trip[];
}

const initialState: TripsState = {
  trips: []
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTrips(state, action: PayloadAction<Trip[]>) {
      state.trips = action.payload;
    },
    removeTrip(state, action: PayloadAction<number>) {
      state.trips = state.trips.filter((t) => t.id !== action.payload);
    }
  }
});

export const { setTrips, removeTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
