"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const router = express.Router();
exports.router = router;
router.route("/").get((req, res) => {
    res.sendStatus(200);
});
