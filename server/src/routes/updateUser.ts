const multer = require("multer");
import { Request } from "express";
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const controller = require("../controllers/updateUser");
import { validateToken } from "../middlewares/validateToken";

interface CustomRequest extends Request {
  uploadedFilename: string;
}

const router = express.Router();

router.use(validateToken);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (
    req: CustomRequest,
    file: { originalname: string },
    cb: (error: Error | null, filename: string) => void
  ) {
    const fileId = uuidv4();
    const fileExtension = file.originalname.split(".").pop();

    const newFilename = `${fileId}.${fileExtension}`;
    req.uploadedFilename = newFilename;
    cb(null, newFilename);
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
