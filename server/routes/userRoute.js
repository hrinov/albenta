const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router
  .route("/user")
  .get(userController.get)
  .post(userController.create)
  .put(userController.update)
  .delete(userController.remove);


module.exports = { router };
