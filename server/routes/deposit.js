const express = require("express");
const router = express.Router();
const deposit = require("../controllers/deposit.js");

router
    .route("/")
    .post(deposit.openDeposit)


module.exports = { router };
