"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeposits = exports.openDeposit = void 0;
const { updateUser } = require("../db/queries/userQueries");
const { handleUserActivity } = require("../utils/activityLog");
const { open, findAll } = require("../db/queries/depositQueries");
const openDeposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, hours, percent } = req.body;
    if (!amount || !hours || !percent) {
        // handle not all arguments
        return res
            .status(400)
            .json({ message: "amount, hours and percent are required" });
    }
    // handle low amount
    if (amount < 10) {
        return res
            .status(400)
            .json({ message: "please ensure the amount is greater than 10" });
    }
    // handle bad hours input
    if (hours > 100) {
        return res
            .status(400)
            .json({ message: "you can't use more than 100 hours" });
    }
    const allowedPercentRates = [5, 10, 15, 20, 25];
    // handle bad percent input
    if (!allowedPercentRates.includes(percent)) {
        return res.status(400).json({
            message: `invalid percent, valid percents are: ${allowedPercentRates.join(", ")}`,
        });
    }
    // handle not amount
    if (amount > req.user.balance) {
        return res.status(400).json({ message: "insufficient funds" });
    }
    const newUserData = Object.assign(Object.assign({}, req.user), { balance: +req.user.balance - +amount });
    const updatedUser = yield updateUser(newUserData);
    const currentDate = new Date();
    const depositOptions = {
        amount: Math.floor(+amount),
        hours: Math.floor(+hours),
        percent: +percent,
        created_at: currentDate,
        user_id: req.user.id,
    };
    const newDeposit = yield open(depositOptions);
    //handle activity
    try {
        yield handleUserActivity(req.useragent, req.user.id, `open ${percent}% deposit`);
    }
    catch (error) {
        console.log(error);
    }
    return res
        .status(200)
        .json({ success: true, data: { user: updatedUser, deposit: newDeposit } });
});
exports.openDeposit = openDeposit;
const getDeposits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deposits = yield findAll(req.user.id);
    //create deposits info
    deposits = deposits.map((deposit) => (Object.assign(Object.assign({}, deposit), { profit: ((+deposit.amount / 100) *
            +deposit.percent *
            +deposit.hours).toFixed(2), total_sum: ((+deposit.amount / 100) * +deposit.percent * +deposit.hours +
            +deposit.amount).toFixed(2), end_date: new Date(new Date(deposit.created_at).getTime() + deposit.hours * 60 * 60 * 1000) })));
    //check deposit types
    const currentDate = new Date();
    const activeDeposits = deposits.filter((deposit) => {
        const createdAt = new Date(deposit.created_at);
        const endDate = new Date(createdAt.getTime() + deposit.hours * 60 * 60 * 1000);
        return endDate.getTime() > currentDate.getTime();
    });
    const expiredDeposits = deposits.filter((deposit) => {
        const createdAt = new Date(deposit.created_at);
        const endDate = new Date(createdAt.getTime() + deposit.hours * 60 * 60 * 1000);
        return endDate.getTime() < currentDate.getTime();
    });
    const readyDeposits = expiredDeposits.filter((deposit) => !deposit.closed);
    const closedDeposits = deposits.filter((deposit) => deposit.closed);
    const limit = req.query.limit;
    return res.status(200).json({
        success: true,
        data: {
            active: activeDeposits.filter((_, i) => !limit || i + 1 <= +limit),
            ready: readyDeposits.filter((_, i) => !limit || i + 1 <= +limit - activeDeposits.length),
            closed: closedDeposits.filter((_, i) => !limit ||
                i + 1 <= +limit - activeDeposits.length - readyDeposits.length),
        },
    });
});
exports.getDeposits = getDeposits;
