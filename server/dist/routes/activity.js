"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const validateToken_ts_1 = require("../middlewares/validateToken.ts");
const express = require("express");
const router = express.Router();
exports.router = router;
const controller = require("../controllers/activity.ts");
router.use(validateToken_ts_1.validateToken).route("/").get(controller.getActivity);
