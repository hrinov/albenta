const express = require("express");
const router = express.Router();
const controller = require("../controllers/updateUser.js");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});
const upload = multer({
    storage: storage, limits: {
        fileSize: 10 * 1024 * 1024,
    },
})

router
    .route("/")
    .put(upload.single('file'), controller.updateUser)

module.exports = { router };
