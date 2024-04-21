const express = require("express");
const router = express.Router();
const controller = require("../controllers/withdraw.ts");
import { validateToken } from "../middlewares/validateToken";

router.use(validateToken).route("/").post(controller.withdrawDeposit);

export { router };
