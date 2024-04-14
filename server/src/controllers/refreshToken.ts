require("dotenv").config();
const jwt = require("jsonwebtoken");
import { getUserByEmail, updateUser } from "../db/queries/userQueries";

const updateTokens = async (req: any, res: any) => {
  const { refreshToken } = req.body;
  let decodedToken;

  try {
    decodedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
  } catch (error) {
    // handle wrong or expired token error
    if ((error as any).message == "jwt expired") {
      return res.status(400).json({ message: "token has expired" });
    }
    return res.status(400).json({ message: "wrong token" });
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (decodedToken.exp < currentTime) {
    // handle expired token error
    return res.status(400).json({ message: "token has expired" });
  }
  const userEmail = decodedToken.email;
  const user = await getUserByEmail(userEmail);

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
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }
  function generateRefreshToken() {
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
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
      delete result.id;
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = { updateTokens };
