const express = require("express");
const router = express.Router();
const me = require("../controllers/me.js");

router
    .route("/")
    .get(me.getUser)


module.exports = { router };
