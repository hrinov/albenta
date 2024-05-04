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
exports.getIncomeHistory = void 0;
const { getAllUserActivity } = require("../db/queries/activityQueries");
const getIncomeHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const month = Number(req.query.month);
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Number(month)];
    const year = Number(req.query.year);
    // handle not all arguments
    if (!month || !year) {
        return res.status(400).json({ message: "month and year are required" });
    }
    // get withdraw activity
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month <= 11 ? month : 0, 1);
    let activity = yield getAllUserActivity(req.user.id, 0, startDate, endDate);
    // convert activity in month income
    const monthIncome = activity === null || activity === void 0 ? void 0 : activity.data.map((item) => {
        var _a;
        return ({
            day: item.date.getDate(),
            amount: +((_a = item.type.replace("withdraw ", "")) === null || _a === void 0 ? void 0 : _a.replace("$", "")),
        });
    });
    // function needed to sum income per each day
    function sumDuplicateDays(days) {
        const sums = {};
        days.forEach((obj) => {
            if (obj.day in sums) {
                sums[obj.day] += obj.amount;
            }
            else {
                sums[obj.day] = obj.amount;
            }
        });
        const result = Object.keys(sums).map((day) => ({
            day: parseInt(day),
            amount: sums[parseInt(day)],
        }));
        return result;
    }
    const monthData = sumDuplicateDays(monthIncome);
    const totalIncome = monthData
        .reduce((acc, income) => acc + income.amount, 0)
        .toFixed(2);
    const averageIncome = (+totalIncome / daysInMonth).toFixed(2);
    return res.status(200).json({
        success: !!monthIncome,
        data: sumDuplicateDays(monthIncome),
        total: totalIncome,
        average: averageIncome,
    });
});
exports.getIncomeHistory = getIncomeHistory;
