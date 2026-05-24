import api from "../../../app/api";
import { Trip, TripPayload } from "../../../types";

export const getTrips = () => api.get<Trip[]>("/trips");
export const postTrip = (data: TripPayload) => api.post("/trips", data);
export const putTrip = (id: number, data: TripPayload) => api.put(`/trips/${id}`, data);
export const deleteTrip = (id: number) => api.delete(`/trips/${id}`);
