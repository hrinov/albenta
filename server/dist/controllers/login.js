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
exports.auth = void 0;
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const activityLog_1 = require("../utils/activityLog");
const userQueries_1 = require("../db/queries/userQueries");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "email and password are required" });
    }
    email = email.trim();
    //handle user not found error
    const user = yield (0, userQueries_1.getUserByEmail)(email);
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ message: "wrong password" });
    }
    //generate new tokens
    function generateAccessToken() {
        return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
            expiresIn: "15m",
        });
    }
    function generateRefreshToken() {
        return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
            expiresIn: "30d",
        });
    }
    const data = Object.assign(Object.assign({}, user), { access_token: generateAccessToken(), refresh_token: generateRefreshToken() });
    //update user
    try {
        const result = yield (0, userQueries_1.updateUser)(data);
        if (result) {
            delete result.password;
            //handle activity
            try {
                yield (0, activityLog_1.handleUserActivity)(+req.ip, req.useragent, user.id, "login");
            }
            catch (error) {
                console.log(error);
            }
            return res.status(200).json({ success: true, data: result });
        }
        else {
            throw Error;
        }
    }
    catch (error) {
        return res.status(500).json({ success: false });
    }
});
exports.auth = auth;
