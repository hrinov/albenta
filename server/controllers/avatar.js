const path = require('path')
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const { handleUserActivity } = require("../utils/activityLog")
const { updateUser: updateUserQuery, getUserByEmail } = require("../db/queries/userQueries")

const getAvatar = async (req, res) => {
    const filename = req.query?.filename;
    const filePath = filename && path.join(__dirname, '..', 'uploads', filename);

    if (!filename || !filePath) {
        return res.status(404).send('Message: file not found');
    }
    try {
        res.sendFile(filePath);
    } catch (error) {
        return res.status(404).send(`Message: ${error}`);
    }
};

const deleteAvatar = async (req, res) => {
    const filename = req.query?.filename;
    const filePath = filename && path.join(__dirname, '..', 'uploads', filename);
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

    if (!filename || !filePath) {
        return res.status(404).send('Message: file not found');
    }

    try {

        await fs.unlink(filePath);

        const data = {
            ...user,
            avatar: null
        };

        const result = await updateUserQuery(data)

        if (result) {
            //handle activity
            try {
                await handleUserActivity(req.ip, req.useragent, user.id, "update profile")
            }
            catch (error) {
                console.log(error)
            }

            return res.status(200).json({ "success": true })
        } else {
            return res.status(500).json({ "success": false })
        }

    } catch (error) {
        return res.status(500).json({ "success": false })
    }
};

module.exports = { getAvatar, deleteAvatar };

