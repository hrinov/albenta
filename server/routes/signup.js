const express = require("express");
const router = express.Router();
const signup = require("../controllers/signup.js");

router
  .route("/")
  .post(signup.addUser)


module.exports = { router };