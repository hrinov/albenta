require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require("../db/queries/userQueries")
const { handleUserActivity } = require("../utils/activityLog")
const { updateUser: updateUserQuery } = require("../db/queries/userQueries")

const updateUser = async (req, res) => {
    let { name, email, password } = req.body

    if (!name && !email && !password) {
        return res.status(400).json({ "message": "name, email or password is required" })
    }

    const access_token = req?.headers?.authorization?.substring(7)

    let decodedToken;
    try {
        decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
    } catch (error) {
        // handle wrong or expired token error
        if (error.message == "jwt expired") { return res.status(400).json({ "message": "token has expired" }) }
        return res.status(400).json({ "message": "wrong token" })
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decodedToken.exp < currentTime) {
        // handle expired token error
        return res.status(400).json({ "message": "token has expired" })
    }

    const userCurrentEmail = decodedToken.email;
    const user = await getUserByEmail(userCurrentEmail)

    if (!user) {
        return res.status(400).json({ "message": "user not found" })
    }
    //validate name
    if (name) {
        name = name.trim()
        const matchRegExp = () => {
            return /^[a-zA-Z\s]+$/.test(name);
        }
        if (!name || !matchRegExp() || name.length < 3) {
            return res.status(400).json({ "message": "invalid name, name should contain at list 3 letters" })
        }
    }

    //validate password
    if (password) {
        const validatePassword = (password) => {
            const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/
            return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password)
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ "message": "invalid password" })
        }
        password = bcrypt.hashSync(password, 10)
    }

    // validate email
    if (email) {
        email = email.trim();
        const validateEmail = () => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        if (!email || !validateEmail()) {
            return res.status(400).json({ "message": "invalid email" });
        }
    }

    //update user
    try {
        const data = {
            ...user,
            ...(name ? { name: name } : {}),
            ...(email ? { email: email } : {}),
            ...(password ? { password: password } : {}),
        };

        const result = await updateUserQuery(data)

        if (result) {
            delete result.password;

            //handle activity
            try {
                await handleUserActivity(req.ip, req.useragent, user.id, "update profile")
            }
            catch (error) {
                console.log(error)
            }

            return res.status(200).json({ "success": true, data: result })
        } else {
            return res.status(500).json({ "success": false })
        }

    } catch (error) {
        return res.status(500).json({ "success": false })
    }
}


module.exports = { updateUser }