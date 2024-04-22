"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const router = express.Router();
exports.router = router;
const controller = require("../controllers/deposit");
const validateToken_1 = require("../middlewares/validateToken");
router
    .use(validateToken_1.validateToken)
    .route("/")
    .post(controller.openDeposit)
    .get(controller.getDeposits);
