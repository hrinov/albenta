const express = require("express");
const router = express.Router();
const controller = require("../controllers/income.js");

router
    .route("/")
    .get(controller.getIncomeHistory)

module.exports = { router };
