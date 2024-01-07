const express = require("express");
const router = express.Router();
const controller = require("../controllers/deposit.js");

router
    .route("/")
    .post(controller.openDeposit)
    .get(controller.getDeposits)

module.exports = { router };
