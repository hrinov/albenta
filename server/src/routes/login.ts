const express = require("express");
const router = express.Router();
const controller = require("../controllers/login");

router.route("/").post(controller.auth);

export { router };
