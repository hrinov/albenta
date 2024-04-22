import { validateToken } from "../middlewares/validateToken";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/activity");

router.use(validateToken).route("/").get(controller.getActivity);

export { router };
