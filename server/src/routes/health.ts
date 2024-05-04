const express = require("express");
const router = express.Router();
import { Request, Response } from "express";

router.route("/").get((req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router };
