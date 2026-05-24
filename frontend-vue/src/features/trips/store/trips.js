import { defineStore } from "pinia";
import {
  getTrips,
  postTrip,
  putTrip,
  deleteTrip,
} from "../api";

export const useTripStore = defineStore("trips", {
  state: () => ({
    trips: []
  }),
  actions: {
    async fetchTrips() {
      const res = await getTrips();
      this.trips = res.data;
    },
    async createTrip(data) {
      await postTrip(data);
      await this.fetchTrips();
    },
    async updateTrip(id, data) {
      await putTrip(id, data);
      await this.fetchTrips();
    },
    async deleteTrip(id) {
      await deleteTrip(id);
      this.trips = this.trips.filter(t => t.id !== id);
    }
  }
});
