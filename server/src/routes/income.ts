const express = require("express");
const router = express.Router();
const controller = require("../controllers/income.ts");

router.route("/").get(controller.getIncomeHistory);

export { router };
