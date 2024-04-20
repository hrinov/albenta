const multer = require("multer");
import { Request } from "express";
const express = require("express");
const controller = require("../controllers/updateUser.ts");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (
    _: Request,
    file: { originalname: string },
    cb: (error: Error | null, filename: string) => void
  ) {
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

export { router };
