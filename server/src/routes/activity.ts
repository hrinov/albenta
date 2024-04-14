const express = require("express");
const router = express.Router();
const controller = require("../controllers/activity.ts");

router.route("/").get(controller.getActivity);

export { router };
