const prisma = require("@prisma/client").PrismaClient;
const db = new prisma();

const createTrip = (data, userId) => {
  return db.trip.create({
    data: {
      ...data,
      departure: new Date(data.departure),
      returnDate: new Date(data.returnDate),
      price: parseFloat(data.price),
      userId
    }
  });
};

const getTrips = (userId) => {
  return db.trip.findMany({ where: { userId } });
};

const getTripById = (id) => {
  return db.trip.findUnique({ where: { id } });
};

const updateTrip = (id, data) => {
  return db.trip.update({
    where: { id },
    data: {
      ...data,
      ...(data.price !== undefined && { price: parseFloat(data.price) }),
      ...(data.departure !== undefined && { departure: new Date(data.departure) }),
      ...(data.returnDate !== undefined && { returnDate: new Date(data.returnDate) }),
    }
  });
};

const deleteTrip = (id) => {
  return db.trip.delete({ where: { id } });
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
};
