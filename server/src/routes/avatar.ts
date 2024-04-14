const express = require("express");
const router = express.Router();
const controller = require("../controllers/avatar.ts");

router.route("/").get(controller.getAvatar).delete(controller.deleteAvatar);

export { router };
