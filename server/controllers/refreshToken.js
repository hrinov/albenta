const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../db/queries/userQueries");

const updateTokens = async (req, res) => {
  const { refreshToken } = req.body;
  const decodedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (decodedToken.exp < currentTime) {
    // Token has expired
    return res.status(400).json({ "message": "token has expired" })
  }
  const userEmail = decodedToken.email;
  const user = await getUserByEmail(userEmail)
  console.log(user)


  //   if (!name || !email || !password) {
  //     return res
  //       .status(400)
  //       .json({ message: "name, email and password are required" });
  //   }
  //   //validate name
  //   name = name.trim();
  //   const matchRegExp = () => {
  //     return /^[a-zA-Z\s]+$/.test(name);
  //   };
  //   if (!name || !matchRegExp() || name.length < 3) {
  //     return res
  //       .status(400)
  //       .json({ message: "invalid name, name should contain at list 3 letters" });
  //   }
  //   //validate password
  //   const validatePassword = (password) => {
  //     const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/;
  //     return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password);
  //   };
  //   if (!validatePassword(password)) {
  //     return res.status(400).json({ message: "invalid password" });
  //   }
  //   password = bcrypt.hashSync(password, 10);
  //   // validate email
  //   email = email.trim();
  //   const validateEmail = () => {
  //     // Regular expression for basic email validation
  //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //   };
  //   if (!email || !validateEmail()) {
  //     return res.status(400).json({ message: "invalid email" });
  //   }
  //   //validate user
  //   const user = await getUserByEmail(email);
  //   if (user) {
  //     return res.status(400).json({ message: "user already exists" });
  //   }
  //   //create date
  //   function generateAccessToken(email) {
  //     return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "15m" });
  //   }
  //   function generateRefreshToken() {
  //     return uuidv4();
  //   }
  //   const data = {
  //     email: email,
  //     password: bcrypt.hashSync(password, 10),
  //     access_token: generateAccessToken({ email }),
  //     refresh_token: generateRefreshToken(),
  //     name: name,
  //   };
  //   //create new user
  //   try {
  //     const result = await createUser(data);
  //     if (result) {
  //       return res.status(200).json({ success: true, data: result });
  //     } else {
  //       return res.status(500).json({ success: false });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ success: false });
  //   }

  return res.status(500).json({ success: false });
};

module.exports = { updateTokens };
