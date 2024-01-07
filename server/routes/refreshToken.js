const express = require("express");
const router = express.Router();
const controller = require("../controllers/refreshToken.js");

router
    .route("/")
    .post(controller.updateTokens)


module.exports = { router };
