const express = require("express");
const router = express.Router();
const signup = require("../controllers/signup.js");

router
  .route("/register")
  .post(signup.addUser)


module.exports = { router };
