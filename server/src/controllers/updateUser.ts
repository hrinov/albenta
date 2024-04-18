require("dotenv").config();
import { Request, Response } from "express";
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { getUserByEmail } from "../db/queries/userQueries";
import { handleUserActivity } from "../utils/activityLog";
import { updateUser as updateUserQuery } from "../db/queries/userQueries";

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
  file: { filename: string };
}

const updateUser = async (req: CustomRequest, res: Response) => {
  let { name, email, password } = req.body;
  const avatar = req?.file?.filename;

  if (!name && !email && !password && !avatar) {
    return res
      .status(400)
      .json({ message: "name, email, avatar or password is required" });
  }

  const access_token = req?.headers?.authorization?.substring(7);

  let decodedToken;
  try {
    decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
  } catch (error) {
    // handle wrong or expired token error
    if ((error as Error).message == "jwt expired") {
      return res.status(400).json({ message: "token has expired" });
    }
    return res.status(400).json({ message: "wrong token" });
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (decodedToken.exp < currentTime) {
    // handle expired token error
    return res.status(400).json({ message: "token has expired" });
  }

  const userCurrentEmail = decodedToken.email;
  const user = await getUserByEmail(userCurrentEmail);

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  //validate name
  if (name) {
    name = name.trim();
    const matchRegExp = () => {
      return /^[a-zA-Z\s]+$/.test(name);
    };
    if (!name || !matchRegExp() || name.length < 3) {
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

  // validate email
  if (email) {
    email = email.trim();
    const validateEmail = () => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!email || !validateEmail()) {
      return res.status(400).json({ message: "invalid email" });
    }
  }

  //create tokens
  function generateAccessToken() {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "15m" });
  }

  function generateRefreshToken() {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
  }

  //update user
  try {
    const data = {
      ...user,
      ...(name ? { name: name } : {}),
      ...(email
        ? {
            email: email,
            access_token: generateAccessToken(),
            refresh_token: generateRefreshToken(),
          }
        : {}),
      ...(password ? { password: password } : {}),
      ...(avatar ? { avatar: avatar } : {}),
    };

    const result = await updateUserQuery(data);

    // delete the avatar in case of updating it
    if (avatar) {
      try {
        const previousAvatar = user?.avatar;
        const filePath = path.join(__dirname, "..", "uploads", previousAvatar);
        previousAvatar && (await fs.unlink(filePath));
      } catch (error) {
        console.log(error);
      }
    }

    if (result) {
      delete result.password;

      //handle activity
      try {
        await handleUserActivity(
          req.ip,
          req.useragent,
          user.id,
          "update profile"
        );
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = { updateUser };
