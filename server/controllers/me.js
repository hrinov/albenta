const { getUserByEmail } = require("../db/queries/userQueries");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const access_token = req?.headers?.authorization
  const decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
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

  if (user.access_token !== access_token) {
    // handle wrong token error
    return res.status(400).json({ message: "wrong token" });
  }

  delete user.id;
  return res.status(200).json({ success: true, data: user });

};

module.exports = { getUser };
