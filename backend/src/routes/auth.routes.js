const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.delete("/users/:id", auth, controller.deleteUser);

module.exports = router;
