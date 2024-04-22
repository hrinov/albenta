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
exports.closeDeposit = exports.getActiveDeposit = exports.findAll = exports.open = void 0;
const knex_ts_1 = require("../knex.ts");
const open = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertedDeposit = yield (0, knex_ts_1.db)("deposits").insert(data).returning("*");
        return insertedDeposit[0];
    }
    catch (error) {
        throw error;
    }
});
exports.open = open;
const findAll = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposits = (0, knex_ts_1.db)("deposits")
            .select("id", "hours", "amount", "closed", "user_id", "percent", "created_at")
            .where("user_id", userId);
        return deposits;
    }
    catch (error) {
        throw error;
    }
});
exports.findAll = findAll;
const getActiveDeposit = (depositId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deposit = (0, knex_ts_1.db)("deposits")
            .select("*")
            .where("id", depositId)
            .where("closed", false)
            .where("user_id", userId);
        return deposit;
    }
    catch (error) {
        throw error;
    }
});
exports.getActiveDeposit = getActiveDeposit;
const closeDeposit = (deposit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let closedDeposit = deposit;
        closedDeposit.closed = true;
        const updatedDeposit = yield (0, knex_ts_1.db)("deposits")
            .where("id", deposit.id)
            .update(closedDeposit)
            .returning("*");
        return updatedDeposit[0];
    }
    catch (error) {
        throw error;
    }
});
exports.closeDeposit = closeDeposit;
