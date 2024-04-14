const express = require("express");
const router = express.Router();
const controller = require("../controllers/refreshToken.ts");

router.route("/").post(controller.updateTokens);

export { router };
