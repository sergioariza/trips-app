const tripService = require("../services/trip.service");

const create = async (req, res) => {
  const trip = await tripService.createTrip(req.body, req.user.id);
  res.json(trip);
};

const getAll = async (req, res) => {
  const trips = await tripService.getTrips(req.user.id);
  res.json(trips);
};

const getOne = async (req, res) => {
  const trip = await tripService.getTripById(Number(req.params.id));

  if (!trip || trip.userId !== req.user.id) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(trip);
};

const update = async (req, res) => {
  const trip = await tripService.getTripById(Number(req.params.id));

  if (!trip || trip.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updated = await tripService.updateTrip(
    Number(req.params.id),
    req.body
  );

  res.json(updated);
};

const remove = async (req, res) => {
  const trip = await tripService.getTripById(Number(req.params.id));

  if (!trip || trip.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await tripService.deleteTrip(Number(req.params.id));
  res.json({ message: "Deleted" });
};

module.exports = { create, getAll, getOne, update, remove };
