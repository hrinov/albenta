const express = require("express");
const router = express.Router();
const controller = require("../controllers/withdraw.ts");

router.route("/").post(controller.withdrawDeposit);

export { router };
