const express = require("express");
const router = express.Router();
const controller = require("../controllers/avatar.js");

router
    .route("/")
    .get(controller.getAvatar)
    .delete(controller.deleteAvatar)

module.exports = { router };
