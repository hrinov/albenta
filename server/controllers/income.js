const { getAllUserActivity } = require("../db/queries/activityQueries");
const { getUserByEmail } = require("../db/queries/userQueries");
const jwt = require("jsonwebtoken");

const getIncomeHistory = async (req, res) => {
    const month = req.query.month
    const year = req.query.year

    if (!month || !year) {
        // handle not all parameters
        return res.status(400).json({ "message": "month and year are required" })
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

    // get withdraw activity
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month - 1, 31);

    let activity = await getAllUserActivity(user.id, 0, startDate, endDate)

    // convert activity in month income
    monthIncome = activity?.data.map(item => ({
        day: item.date.getDate(),
        amount: +item.type.replace("withdraw ", "")?.replace("$", "")
    })
    )

    return res.status(200).json({ success: !!monthIncome, data: monthIncome, total: activity.total });

};

module.exports = { getIncomeHistory };

