const express = require("express");
const router = express.Router();
const controller = require("../controllers/me.js");

router
    .route("/")
    .get(controller.getUser)


module.exports = { router };
