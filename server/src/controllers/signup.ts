const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
import { getUserByEmail, createUser } from "../db/queries/userQueries";
import { handleUserActivity } from "../utils/activityLog";

const addUser = async (req: any, res: any) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email and password are required" });
  }

  //validate name
  name = name.trim();
  const matchRegExp = () => {
    return /^[a-zA-Z\s]+$/.test(name);
  };
  if (!name || !matchRegExp() || name.length < 3) {
    console.log(!matchRegExp());
    return res
      .status(400)
      .json({ message: "name should contain at list 3 letters (latin)" });
  }

  //validate password
  const validatePassword = (password: any) => {
    const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/;
    return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password);
  };
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "password should not be shorter than 8 characters and should consist only of numbers or letters",
    });
  }
  password = bcrypt.hashSync(password, 10);

  // validate email
  email = email.trim();
  const validateEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!email || !validateEmail()) {
    return res.status(400).json({ message: "invalid email" });
  }

  //validate user
  const user = await getUserByEmail(email);
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }

  //create date
  function generateAccessToken() {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "15m" });
  }

  function generateRefreshToken() {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
  }

  const data = {
    email: email,
    password: password,
    access_token: generateAccessToken(),
    refresh_token: generateRefreshToken(),
    name: name,
    balance: 1000,
  };

  //create new user
  try {
    const result = await createUser(data);
    if (result) {
      delete result.password;
      delete result.id;

      //handle activity
      try {
        await handleUserActivity(req.ip, req.useragent, user.id, "login");
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

export { addUser };
