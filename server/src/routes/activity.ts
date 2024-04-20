import { validateToken } from "../middlewares/validateToken.ts";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/activity.ts");

router.use(validateToken).route("/").get(controller.getActivity);

export { router };
