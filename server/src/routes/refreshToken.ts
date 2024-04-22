const express = require("express");
const router = express.Router();
const controller = require("../controllers/refreshToken");

router.route("/").post(controller.updateTokens);

export { router };
