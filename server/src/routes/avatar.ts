const express = require("express");
const router = express.Router();
const controller = require("../controllers/avatar");
import { validateToken } from "../middlewares/validateToken";

router.route("/").get(controller.getAvatar);
router.delete("/", validateToken, controller.deleteAvatar);

export { router };
