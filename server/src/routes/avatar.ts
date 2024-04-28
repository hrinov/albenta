const express = require("express");
const router = express.Router();
const controller = require("../controllers/avatar");
import { validateToken } from "../middlewares/validateToken";

router.delete("/", validateToken, controller.deleteAvatar);

export { router };
