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
exports.deleteAvatar = exports.getAvatar = void 0;
const path = require("path");
const fs = require("fs").promises;
const activityLog_1 = require("../utils/activityLog");
const userQueries_1 = require("../db/queries/userQueries");
const getAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filename = (_a = req.query) === null || _a === void 0 ? void 0 : _a.filename;
    const filePath = filename && path.join(__dirname, "..", "..", "uploads", filename);
    if (!filename || !filePath) {
        return res.status(404).send({ message: "file not found" });
    }
    try {
        res.sendFile(filePath);
    }
    catch (error) {
        return res.status(404).send({ message: `${error}` });
    }
});
exports.getAvatar = getAvatar;
const deleteAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const filename = (_b = req.user) === null || _b === void 0 ? void 0 : _b.avatar;
    const filePath = filename && path.join(__dirname, "..", "..", "uploads", filename);
    if (!filename || !filePath) {
        return res.status(404).send({ message: "file not found" });
    }
    try {
        yield fs.unlink(filePath);
        const data = Object.assign(Object.assign({}, req.user), { avatar: "" });
        const result = yield (0, userQueries_1.updateUser)(data);
        if (result && (req === null || req === void 0 ? void 0 : req.ip) && (req === null || req === void 0 ? void 0 : req.useragent)) {
            // handle activity
            try {
                yield (0, activityLog_1.handleUserActivity)(+req.ip, req.useragent, req.user.id, "update profile");
            }
            catch (error) {
                console.log(error);
            }
            return res.status(200).json({ success: true });
        }
        else {
            throw Error;
        }
    }
    catch (error) {
        return res.status(500).json({ success: false });
    }
});
exports.deleteAvatar = deleteAvatar;
