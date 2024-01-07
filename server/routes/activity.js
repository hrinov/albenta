const express = require("express");
const router = express.Router();
const controller = require("../controllers/activity.js");

router
    .route("/")
    .get(controller.getActivity)

module.exports = { router };
