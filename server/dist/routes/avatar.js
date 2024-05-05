"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const router = express.Router();
exports.router = router;
const controller = require("../controllers/avatar");
const validateToken_1 = require("../middlewares/validateToken");
router.delete("/", validateToken_1.validateToken, controller.deleteAvatar);
