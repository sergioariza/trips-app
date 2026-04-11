const express = require("express");
const router = express.Router();
const controller = require("../controllers/trip.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
