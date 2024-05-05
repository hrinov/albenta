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
exports.deleteAvatar = void 0;
const activityLog_1 = require("../utils/activityLog");
const initializeFirebase_1 = require("../utils/initializeFirebase");
const storage_1 = require("firebase/storage");
const userQueries_1 = require("../db/queries/userQueries");
const deleteAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // check if the avatar filename is provided in the request
        const filename = (_a = req.user) === null || _a === void 0 ? void 0 : _a.avatar;
        if (!filename) {
            return res.status(400).send({ message: "Avatar filename not provided" });
        }
        //remove avatar info from user
        yield (0, userQueries_1.updateUser)(Object.assign(Object.assign({}, req.user), { avatar: "" }));
        //add activity
        try {
            yield (0, activityLog_1.handleUserActivity)(req.useragent, req.user.id, "update profile");
        }
        catch (error) {
            console.log(error);
        }
        //initialize Firebase
        const firebaseApp = (0, initializeFirebase_1.initializeFirebase)();
        const storage = (0, storage_1.getStorage)(firebaseApp);
        //get a reference to the file in Firebase Storage
        const fileRef = (0, storage_1.ref)(storage, filename);
        //delete the file from Firebase Storage
        yield (0, storage_1.deleteObject)(fileRef);
        res.status(200).send({ message: "avatar deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "error deleting avatar" });
    }
});
exports.deleteAvatar = deleteAvatar;
