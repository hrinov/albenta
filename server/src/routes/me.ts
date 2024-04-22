const express = require("express");
const router = express.Router();
const controller = require("../controllers/me");
import { validateToken } from "../middlewares/validateToken";

router.use(validateToken).route("/").get(controller.getUser);

export { router };
