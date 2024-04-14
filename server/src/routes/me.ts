const express = require("express");
const router = express.Router();
const controller = require("../controllers/me.ts");

router.route("/").get(controller.getUser);

export { router };
