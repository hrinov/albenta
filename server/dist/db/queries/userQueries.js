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
exports.updateUser = exports.createUser = exports.getUserByEmail = void 0;
const knex_1 = require("../knex");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, knex_1.db)("users").select("*").where("email", email).first();
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insertedUser = yield (0, knex_1.db)("users").insert(data).returning("*");
        return insertedUser[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const updateUser = (newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield (0, knex_1.db)("users")
            .where("id", newData.id)
            .update(newData)
            .returning("*");
        return updatedUser[0];
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
