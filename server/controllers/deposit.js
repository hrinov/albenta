const { getUserByEmail } = require("../db/queries/userQueries");
const jwt = require("jsonwebtoken");

const openDeposit = async (req, res) => {
    const { amount } = req.body;
    if (!amount) {
        // handle not amount
        return res.status(400).json({ "message": "amount is required" })
    }

    const access_token = req?.headers?.authorization?.substring(7)
    let decodedToken;
    try {
        decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
    } catch (error) {
        // handle wrong or expired token error
        if (error.message == "jwt expired") {
            return res.status(400).json({ "message": "token has expired" })
        }
        return res.status(400).json({ "message": "wrong token" })
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decodedToken.exp < currentTime) {
        // handle expired token error
        return res.status(400).json({ "message": "token has expired" })
    }

    const user = await getUserByEmail(userEmail)

    if (!user) {
        // handle user not found error
        return res.status(400).json({ message: "user not found" });
    }

    if (user.access_token !== access_token) {
        // handle wrong token error
        return res.status(400).json({ message: "wrong token" });
    }

    if (amount > user.balance) {
        // handle not amount
        return res.status(400).json({ "message": "insufficient funds" })
    }

    const newUserData = {
        ...user,
        balance: balance - amount
    };

    const updatedUser = await updateUser(newUserData);





    return res.status(200).json({ success: true, data: { user: updatedUser } });

};

module.exports = { openDeposit };
