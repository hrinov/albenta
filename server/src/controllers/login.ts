require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { handleUserActivity } from "../utils/activityLog";
import { getUserByEmail, updateUser } from "../db/queries/userQueries";

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
}

const auth = async (req: CustomRequest, res: Response) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  email = email.trim();

  //handle user not found error
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "wrong password" });
  }

  //generate new tokens
  function generateAccessToken() {
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  function generateRefreshToken() {
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
  }

  const data = {
    ...user,
    access_token: generateAccessToken(),
    refresh_token: generateRefreshToken(),
  };

  //update user
  try {
    const result = await updateUser(data);
    if (result) {
      delete result.password;
      console.log(req);
      //handle activity
      try {
        await handleUserActivity(req.useragent, user.id, "login");
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json({ success: true, data: result });
    } else {
      throw Error;
    }
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export { auth };
