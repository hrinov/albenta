"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.updateUser = exports.activity = exports.withdraw = exports.deposit = exports.income = exports.health = exports.avatar = exports.signup = exports.login = exports.me = void 0;
const me_1 = require("./me");
Object.defineProperty(exports, "me", { enumerable: true, get: function () { return me_1.router; } });
const login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_1.router; } });
const health_1 = require("./health");
Object.defineProperty(exports, "health", { enumerable: true, get: function () { return health_1.router; } });
const avatar_1 = require("./avatar");
Object.defineProperty(exports, "avatar", { enumerable: true, get: function () { return avatar_1.router; } });
const signup_1 = require("./signup");
Object.defineProperty(exports, "signup", { enumerable: true, get: function () { return signup_1.router; } });
const income_1 = require("./income");
Object.defineProperty(exports, "income", { enumerable: true, get: function () { return income_1.router; } });
const deposit_1 = require("./deposit");
Object.defineProperty(exports, "deposit", { enumerable: true, get: function () { return deposit_1.router; } });
const withdraw_1 = require("./withdraw");
Object.defineProperty(exports, "withdraw", { enumerable: true, get: function () { return withdraw_1.router; } });
const activity_1 = require("./activity");
Object.defineProperty(exports, "activity", { enumerable: true, get: function () { return activity_1.router; } });
const updateUser_1 = require("./updateUser");
Object.defineProperty(exports, "updateUser", { enumerable: true, get: function () { return updateUser_1.router; } });
const refreshToken_1 = require("./refreshToken");
Object.defineProperty(exports, "refreshToken", { enumerable: true, get: function () { return refreshToken_1.router; } });
