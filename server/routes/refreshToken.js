const express = require("express");
const router = express.Router();
const refreshToken = require("../controllers/refreshToken.js");

router
    .route("/")
    .post(refreshToken.updateTokens)


module.exports = { router };
