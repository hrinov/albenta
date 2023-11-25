const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require("../db/queries/userQueries")

const addUser = async (req, res) => {
    let { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ "message": "name, email and password are required" })
    }

    //validate name
    name = name.trim()
    const matchRegExp = () => {
        return /^[a-zA-Z\s]+$/.test(name);
    }
    if (!name || !matchRegExp() || name.length < 3) {
        return res.status(400).json({ "message": "invalid name, name should contain at list 3 letters" })
    }

    //validate password
    const validatePassword = (password) => {
        const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/
        return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password)
    }
    if (!validatePassword(password)) {
        return res.status(400).json({ "message": "invalid password" })
    }
    password = bcrypt.hashSync(password, 10)

    // validate email
    email = email.trim();
    const validateEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!email || !validateEmail()) {
        return res.status(400).json({ "message": "invalid email" });
    }

    //validate user
    const user = await getUserByEmail(email)
    if (user) { return res.status(400).json({ "message": "user already exists" }) }


    //create date
    function generateAccessToken() {
        return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '15m' });
    }

    function generateRefreshToken() {
        return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    }

    const data = {
        email: email,
        password: bcrypt.hashSync(password, 10),
        access_token: generateAccessToken(),
        refresh_token: generateRefreshToken(),
        name: name
    }

    //create new user
    try {
        const result = await createUser(data)
        if (result) {
            delete result.password;
            delete result.id;
            return res.status(200).json({ "success": true, data: result })
        } else {
            return res.status(500).json({ "success": false })
        }

    } catch (error) {
        return res.status(500).json({ "success": false })
    }
}


module.exports = { addUser }