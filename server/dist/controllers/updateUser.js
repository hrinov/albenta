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
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const activityLog_1 = require("../utils/activityLog");
const userQueries_1 = require("../db/queries/userQueries");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let { name, email, password } = req.body;
    const avatar = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename;
    // handle not all arguments
    if (!name && !email && !password && !avatar) {
        return res
            .status(400)
            .json({ message: "name, email, avatar or password is required" });
    }
    //validate name
    if (name) {
        name = name.trim();
        const validateEmail = () => {
            return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
        };
        if (!validateEmail() || name.length < 3) {
            return res.status(400).json({
                message: "invalid name, name should contain at list 3 letters",
            });
        }
    }
    //validate password
    if (password) {
        const validatePassword = (password) => {
            const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/;
            return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password);
        };
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "invalid password" });
        }
        password = bcrypt.hashSync(password, 10);
    }
    // validate email
    if (email) {
        email = email.trim();
        const validateEmail = () => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
        if (!validateEmail()) {
            return res.status(400).json({ message: "invalid email" });
        }
    }
    //create tokens
    function generateAccessToken() {
        return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "5m" });
    }
    function generateRefreshToken() {
        return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
    }
    //update user
    try {
        const data = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, req.user), (name ? { name: name } : {})), (email
            ? {
                email: email,
                access_token: generateAccessToken(),
                refresh_token: generateRefreshToken(),
            }
            : {})), (password ? { password: password } : {})), (avatar ? { avatar: avatar } : {}));
        const result = yield (0, userQueries_1.updateUser)(data);
        // delete the avatar in case of updating it
        if (avatar) {
            try {
                const previousAvatar = (_b = req.user) === null || _b === void 0 ? void 0 : _b.avatar;
                const filePath = path.join(__dirname, "..", "..", "uploads", previousAvatar);
                previousAvatar && (yield fs.unlink(filePath));
            }
            catch (error) {
                console.log(error);
            }
        }
        if (result) {
            delete result.password;
            //handle activity
            try {
                yield (0, activityLog_1.handleUserActivity)(+req.ip, req.useragent, req.user.id, "update profile");
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
module.exports = { updateUser };
