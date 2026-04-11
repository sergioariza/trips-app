import { defineStore } from "pinia";
import api from "../services/api";

export const useTripStore = defineStore("trips", {
  state: () => ({
    trips: []
  }),

  actions: {
    async fetchTrips() {
      const res = await api.get("/trips");
      this.trips = res.data;
    },

    async createTrip(data) {
      await api.post("/trips", data);
      await this.fetchTrips();
    },

    async updateTrip(id, data) {
      await api.put(`/trips/${id}`, data);
      await this.fetchTrips();
    },

    async deleteTrip(id) {
      await api.delete(`/trips/${id}`);
      this.trips = this.trips.filter(t => t.id !== id);
    }
  }
});
