const express = require("express");
const router = express.Router();
const controller = require("../controllers/income.ts");
import { validateToken } from "../middlewares/validateToken";

router.use(validateToken).route("/").get(controller.getIncomeHistory);

export { router };
