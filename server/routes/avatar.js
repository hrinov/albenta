const express = require("express");
const router = express.Router();
const controller = require("../controllers/avatar.js");

router
    .route("/")
    .get(controller.getAvatar)

module.exports = { router };
