const express = require("express");
const router = express.Router();
const controller = require("../controllers/deposit");
import { validateToken } from "../middlewares/validateToken";

router
  .use(validateToken)
  .route("/")
  .post(controller.openDeposit)
  .get(controller.getDeposits);

export { router };
