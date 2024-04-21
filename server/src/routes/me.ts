const express = require("express");
const router = express.Router();
const controller = require("../controllers/me.ts");
import { validateToken } from "../middlewares/validateToken";

router.use(validateToken).route("/").get(controller.getUser);

export { router };
