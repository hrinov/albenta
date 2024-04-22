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
exports.addUser = void 0;
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const activityLog_1 = require("../utils/activityLog");
const userQueries_1 = require("../db/queries/userQueries");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "name, email and password are required" });
    }
    //validate name
    name = name.trim();
    const validateName = () => {
        return name.length >= 3 && /^[a-zA-Z\s]+$/.test(name);
    };
    if (!validateName()) {
        return res
            .status(400)
            .json({ message: "name should contain at list 3 letters (latin)" });
    }
    //validate password
    const validatePassword = (password) => {
        const disallowedSymbolsAndSpaces = /[!@#$%^&*()_+={}[\]\\|:;"'<>,.?/~\s]/;
        return password.length >= 8 && !disallowedSymbolsAndSpaces.test(password);
    };
    if (!validatePassword(password)) {
        return res.status(400).json({
            message: "password should not be shorter than 8 characters and should consist only of numbers or letters",
        });
    }
    password = bcrypt.hashSync(password, 10);
    // validate email
    email = email.trim();
    const validateEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    if (!validateEmail()) {
        return res.status(400).json({ message: "invalid email" });
    }
    //validate user
    const user = yield (0, userQueries_1.getUserByEmail)(email);
    if (user) {
        return res.status(400).json({ message: "user already exists" });
    }
    //create date
    function generateAccessToken() {
        return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "15m" });
    }
    function generateRefreshToken() {
        return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
    }
    const data = {
        email: email,
        password: password,
        access_token: generateAccessToken(),
        refresh_token: generateRefreshToken(),
        name: name,
        balance: 1000,
    };
    //create new user
    try {
        const result = yield (0, userQueries_1.createUser)(data);
        if (result) {
            delete result.password;
            delete result.id;
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
exports.addUser = addUser;
