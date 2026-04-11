const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/trips", require("./routes/trip.routes"));

module.exports = app;
