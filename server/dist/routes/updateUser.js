"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const multer = require("multer");
const express = require("express");
const controller = require("../controllers/updateUser");
const validateToken_1 = require("../middlewares/validateToken");
const router = express.Router();
exports.router = router;
router.use(validateToken_1.validateToken);
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (_, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
router.route("/").put(upload.single("file"), controller.updateUser);
