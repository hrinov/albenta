const express = require("express");
const router = express.Router();
const controller = require("../controllers/withdraw.js");

router
    .route("/")
    .post(controller.withdrawDeposit)

module.exports = { router };
