const { getUserByEmail, updateUser } = require("../db/queries/userQueries");
const { handleUserActivity } = require("../utils/activityLog")
const { open, findAll } = require("../db/queries/depositQueries");
const jwt = require("jsonwebtoken");

const openDeposit = async (req, res) => {
    const { amount, hours, percent } = req.body;
    if (!amount || !hours || !percent) {
        // handle not all parametres
        return res.status(400).json({ "message": "amount, hours and percent are required" })
    }

    if (amount < 10) {
        // handle low amount
        return res.status(400).json({ "message": "please ensure the amount is greater than 10" })
    }

    if (hours > 100) {
        // handle bad hours input
        return res.status(400).json({ "message": "you can't use more than 100 hours" })
    }

    const allowedPercentRates = [5, 10, 15, 20, 25]
    if (!allowedPercentRates.includes(percent)) {
        // handle bad percent input
        return res.status(400).json({ message: `invalid percent, valid percents are: ${allowedPercentRates.join(", ")}` })
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

    if (amount > user.balance) {
        // handle not amount
        return res.status(400).json({ "message": "insufficient funds" })
    }

    const newUserData = {
        ...user,
        balance: (+user.balance - +amount)
    };

    const updatedUser = await updateUser(newUserData);

    const currentDate = new Date()

    const depositOptions = {
        amount: +amount,
        hours: +hours,
        percent: +percent,
        created_at: currentDate,
        user_id: user.id
    }

    const newDeposit = await open(depositOptions)

    //handle activity
    try {
        await handleUserActivity(req.ip, req.useragent, user.id, `open ${percent}% deposit`)
    }
    catch (error) {
        console.log(error)
    }

    return res.status(200).json({ success: true, data: { user: updatedUser, deposit: newDeposit } });

};

const getDeposits = async (req, res) => {
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

    let deposits = await findAll(user.id)
    //create deposits info
    deposits = deposits.map(deposit => ({
        ...deposit,
        profit: ((+deposit.amount / 100) * +deposit.percent * +deposit.hours).toFixed(2),
        total_sum: ((+deposit.amount / 100) * +deposit.percent * +deposit.hours + +deposit.amount).toFixed(2),
        end_date: new Date(new Date(deposit.created_at).getTime() + deposit.hours * 60 * 60 * 1000)
    }))

    //check deposit types
    const currendDate = new Date()

    const activeDeposits = deposits.filter(deposit => {
        const createdAt = new Date(deposit.created_at);
        const endDate = new Date(createdAt.getTime() + deposit.hours * 60 * 60 * 1000);
        return endDate.getTime() > currendDate.getTime()
    })

    const expiredDeposits = deposits.filter(deposit => {
        const createdAt = new Date(deposit.created_at);
        const endDate = new Date(createdAt.getTime() + deposit.hours * 60 * 60 * 1000);
        return endDate.getTime() < currendDate.getTime()
    })


    readyDeposits = expiredDeposits.filter(deposit => !deposit.closed)

    closedDeposits = deposits.filter(deposit => deposit.closed)

    const limit = req.query.limit;

    return res.status(200).json({
        success: true,
        data: {
            active: activeDeposits.filter((item, i) => !limit || i + 1 <= limit),
            ready: readyDeposits.filter((item, i) => !limit || i + 1 <= limit - activeDeposits.length),
            closed: closedDeposits.filter((item, i) => !limit || i + 1 <= limit - activeDeposits.length - readyDeposits.length)
        }
    });

};

module.exports = { openDeposit, getDeposits };

