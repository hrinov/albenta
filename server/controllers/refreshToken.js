require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserByEmail, updateUser } = require("../db/queries/userQueries");

const updateTokens = async (req, res) => {
  const { refreshToken } = req.body;
  const decodedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (decodedToken.exp < currentTime) {
    // handle expired token error
    return res.status(400).json({ "message": "token has expired" })
  }
  const userEmail = decodedToken.email;
  const user = await getUserByEmail(userEmail)

  if (!user) {
    // handle user not found error
    return res.status(400).json({ message: "user not found" });
  }

  if (user.refresh_token !== refreshToken) {
    // handle wrong token error
    return res.status(400).json({ message: "wrong token" });
  }

  //generate new tokens
  function generateAccessToken() {
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "15m" });
  }
  function generateRefreshToken() {
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  }
  const data = {
    id: user.id,
    email: user.email,
    password: user.password,
    access_token: generateAccessToken(),
    refresh_token: generateRefreshToken(),
    name: user.name,
  };
  //update user
  try {
    const result = await updateUser(data);
    if (result) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = { updateTokens };
