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
const userQueries_1 = require("../db/queries/userQueries");
const activityLog_1 = require("../utils/activityLog");
const depositQueries_1 = require("../db/queries/depositQueries");
const withdrawDeposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depositId } = req.body;
    // handle not all arguments
    if (!depositId) {
        return res.status(400).json({ message: "depositId is required" });
    }
    let deposit = yield (0, depositQueries_1.getActiveDeposit)(depositId, req.user.id);
    deposit = deposit[0];
    //handle wrong depositId
    if (!deposit) {
        return res.status(400).json({ message: "deposit not found" });
    }
    //close deposit
    yield (0, depositQueries_1.closeDeposit)(deposit);
    const totalDepositSum = ((+deposit.amount / 100) * +deposit.percent * +deposit.hours +
        +deposit.amount).toFixed(2);
    //update user balance
    const newUserData = Object.assign(Object.assign({}, req.user), { balance: +req.user.balance + +totalDepositSum });
    const updatedUser = yield (0, userQueries_1.updateUser)(newUserData);
    //handle activity
    (0, activityLog_1.handleUserActivity)(+req.ip, req.useragent, req.user.id, `withdraw ${totalDepositSum}$`);
    return res.status(200).json({ success: true, user: updatedUser });
});
module.exports = { withdrawDeposit };
