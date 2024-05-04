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
exports.getAllUserActivity = exports.addActivity = void 0;
const knex_1 = require("../knex");
const addActivity = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, knex_1.db)("activity").insert(data);
    }
    catch (error) {
        throw error;
    }
});
exports.addActivity = addActivity;
const getAllUserActivity = (userId, startIndex, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        let count;
        if (!startDate && !endDate) {
            data = (yield (0, knex_1.db)("activity")
                .select("*")
                .where("user_id", userId)
                .orderBy("date", "desc")
                .offset(startIndex)
                .limit(10));
            count = (yield (0, knex_1.db)("activity")
                .count("* as total")
                .where("user_id", userId)
                .first());
        }
        else {
            data = (yield (0, knex_1.db)("activity")
                .select("*")
                .where("user_id", userId)
                .andWhere("date", ">", startDate)
                .andWhere("date", "<", endDate)
                .andWhere("type", "like", "%withdraw%"));
            count = (yield (0, knex_1.db)("activity")
                .count("* as total")
                .where("user_id", userId)
                .andWhere("date", ">", startDate)
                .andWhere("date", "<", endDate)
                .andWhere("type", "like", "%withdraw%")
                .first());
        }
        return { data, total: count.total };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUserActivity = getAllUserActivity;
