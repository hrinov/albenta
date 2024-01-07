const express = require("express");
const router = express.Router();
const controller = require("../controllers/signup.js");

router
  .route("/")
  .post(controller.addUser)


module.exports = { router };
