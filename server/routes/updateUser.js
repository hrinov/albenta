const express = require("express");
const router = express.Router();
const controller = require("../controllers/updateUser.js");

router
    .route("/")
    .put(controller.updateUser)

module.exports = { router };
