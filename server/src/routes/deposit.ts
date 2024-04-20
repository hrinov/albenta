const express = require("express");
const router = express.Router();
const controller = require("../controllers/deposit.ts");
import { validateToken } from "../middlewares/validateToken";

router
  .use(validateToken)
  .route("/")
  .post(controller.openDeposit)
  .get(controller.getDeposits);

export { router };
