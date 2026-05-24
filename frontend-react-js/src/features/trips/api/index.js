import api from "../../../app/api";

export const getTrips = () => api.get("/trips");
export const postTrip = (data) => api.post("/trips", data);
export const putTrip = (id, data) => api.put(`/trips/${id}`, data);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);
