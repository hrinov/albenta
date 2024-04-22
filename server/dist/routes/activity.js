"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const validateToken_1 = require("../middlewares/validateToken");
const express = require("express");
const router = express.Router();
exports.router = router;
const controller = require("../controllers/activity");
router.use(validateToken_1.validateToken).route("/").get(controller.getActivity);
