const express = require("express");
const router = express.Router();
const activity = require("../controllers/activity.js");

router
    .route("/")
    .get(activity.getActivity)

module.exports = { router };
