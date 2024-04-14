const express = require("express");
const router = express.Router();
const controller = require("../controllers/deposit.ts");

router.route("/").post(controller.openDeposit).get(controller.getDeposits);

export { router };
