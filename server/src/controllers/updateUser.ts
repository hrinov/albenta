require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { handleUserActivity } from "../utils/activityLog";
import { updateUser as updateUserQuery } from "../db/queries/userQueries";

interface CustomRequest extends Request {
  uploadedFilePath: string;
  useragent: { [key: string]: string };
  file: { filename: string };
  user: UserData;
}

const updateUser = async (req: CustomRequest, res: Response) => {
  let { name, email, password } = req.body;
  const avatar = req?.uploadedFilePath;

  //handle not all arguments
  if (!name && !email && !password && !avatar) {
    return res
      .status(400)
      .json({ message: "name, email, avatar or password is required" });
  }

  //validate name
  if (name) {
    name = name.trim();
    const validateEmail = () => {
      return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
    };
    if (!validateEmail() || name.length < 3) {
      return res.status(400).json({
        message: "invalid name, name should contain at list 3 letters",
      });
    }
  }

  //validate password
  if (password) {
    const validatePassword = (password: string) => {
      const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/;
      return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password);
    };
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "invalid password" });
    }
    password = bcrypt.hashSync(password, 10);
  }

  //validate email
  if (email) {
    email = email.trim();
    const validateEmail = () => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!validateEmail()) {
      return res.status(400).json({ message: "invalid email" });
    }
  }

  //create tokens
  function generateAccessToken() {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "5m" });
  }

  function generateRefreshToken() {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
  }

  //update user
  try {
    const data = {
      ...req.user,
      ...(name ? { name } : {}),
      ...(email
        ? {
            email: email,
            access_token: generateAccessToken(),
            refresh_token: generateRefreshToken(),
          }
        : {}),
      ...(password ? { password } : {}),
      ...(avatar ? { avatar } : {}),
    };

    const result = await updateUserQuery(data);

    //delete the avatar in case of updating it
    if (avatar) {
      try {
        const previousAvatar = req.user?.avatar;
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          previousAvatar
        );
        previousAvatar && (await fs.unlink(filePath));
      } catch (error) {
        console.log(error);
      }
    }

    if (result) {
      delete result.password;

      //handle activity
      try {
        await handleUserActivity(req.useragent, req.user.id!, "update profile");
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

module.exports = { updateUser };
