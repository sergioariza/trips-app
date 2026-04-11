import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    trips: []
  },
  reducers: {
    setTrips(state, action) {
      state.trips = action.payload;
    },
    removeTrip(state, action) {
      state.trips = state.trips.filter((t) => t.id !== action.payload);
    }
  }
});

export const { setTrips, removeTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
