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
exports.validateToken = void 0;
const jwt = require("jsonwebtoken");
const userQueries_1 = require("../db/queries/userQueries");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const access_token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.substring(7);
    let decodedToken;
    try {
        decodedToken = jwt.verify(access_token, process.env.TOKEN_SECRET);
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
    if (user.access_token !== access_token) {
        // handle wrong token error
        return res.status(400).json({ message: "wrong token" });
    }
    delete user.password;
    //adding user information to req object
    req.user = user;
    next();
});
exports.validateToken = validateToken;
