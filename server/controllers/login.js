require('dotenv').config()
const jwt = require('jsonwebtoken');
const { getUserByEmail, updateUser } = require("../db/queries/userQueries")

const auth = async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ "message": "email and password are required" })
    }

    email = email.trim();

    //handle user not found error
    const user = await getUserByEmail(email)
    if (!user) { return res.status(400).json({ "message": "user not found" }) }


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
            delete result.password;
            delete result.id;
            return res.status(200).json({ success: true, data: result });
        } else {
            return res.status(500).json({ success: false });
        }
    } catch (error) {
        return res.status(500).json({ success: false });
    }
};


module.exports = { auth }