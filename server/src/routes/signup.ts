const express = require("express");
const router = express.Router();
const controller = require("../controllers/signup");

router.route("/").post(controller.addUser);

export { router };
