const express = require("express");
const router = express.Router();
const controller = require("../controllers/login.js");

router
    .route("/")
    .post(controller.auth)


module.exports = { router };
