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
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userQueries_1 = require("../db/queries/userQueries");
const updateTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    let decodedToken;
    try {
        decodedToken = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
    }
    catch (error) {
        // handle wrong or expired token error
        if (error.message == "jwt expired") {
            return res.status(400).json({ message: "token has expired" });
        }
        return res.status(400).json({ message: "wrong token" });
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decodedToken.exp < currentTime) {
        // handle expired token error
        return res.status(400).json({ message: "token has expired" });
    }
    const user = yield (0, userQueries_1.getUserByEmail)(decodedToken.email);
    if (!user) {
        // handle user not found error
        return res.status(400).json({ message: "user not found" });
    }
    if (user.refresh_token !== refreshToken) {
        // handle wrong token error
        return res.status(400).json({ message: "wrong token" });
    }
    //generate new tokens
    function generateAccessToken() {
        return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
            expiresIn: "5m",
        });
    }
    function generateRefreshToken() {
        return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });
    }
    const data = Object.assign(Object.assign({}, user), { access_token: generateAccessToken(), refresh_token: generateRefreshToken() });
    //update user
    try {
        const result = yield (0, userQueries_1.updateUser)(data);
        if (result) {
            delete result.password;
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
module.exports = { updateTokens };
