const { getAllUserActivity } = require("../db/queries/activityQueries");
const { getUserByEmail } = require("../db/queries/userQueries");
const jwt = require("jsonwebtoken");

const getIncomeHistory = async (req, res) => {
    const month = req.query.month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
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

    // function needed to sum income per every day
    function sumDuplicateDays(days) {
        const sums = {};

        days.forEach(obj => {
            if (sums.hasOwnProperty(obj.day)) {
                sums[obj.day] += obj.amount

            } else {
                sums[obj.day] = obj.amount;
            }
        });

        const result = Object.keys(sums).map(day => ({ day: day, amount: sums[day] }));
        return result || [];
    }

    const monthData = sumDuplicateDays(monthIncome)
    const totalIncome = monthData.reduce((acc, income) => acc + income.amount, 0).toFixed(2)
    const averageIncome = (totalIncome / daysInMonth).toFixed(2)

    return res.status(200).json({ success: !!monthIncome, data: sumDuplicateDays(monthIncome), total: totalIncome, average: averageIncome });

};

module.exports = { getIncomeHistory };

