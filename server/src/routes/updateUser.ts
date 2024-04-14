const express = require("express");
const router = express.Router();
const controller = require("../controllers/updateUser.ts");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname); // Use the original filename
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
