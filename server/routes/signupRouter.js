const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController.js");

router
  .route("/register")
  .post(signupController.addUser)


module.exports = { router };
