const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken');

const addUser = (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ "message": "email and password are required" })
    }

    function generateAccessToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '15m' });
    }

    function generateRefreshToken() {
        return uuidv4();
    }

    const data = {
        email: email,
        password: bcrypt.hashSync(password, 10),
        accessToken: generateAccessToken({ email }),
        refreshToken: generateRefreshToken()
    }

    console.log(data)

    return res.status(200).json({ "success": true })
}


module.exports = { addUser }