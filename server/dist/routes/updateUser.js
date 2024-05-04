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
exports.router = void 0;
const multer = require("multer");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const controller = require("../controllers/updateUser");
const { validateToken } = require("../middlewares/validateToken");
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const { initializeFirebase } = require("../utils/initializeFirebase");
const storage_1 = require("firebase/storage");
const router = express.Router();
exports.router = router;
const upload = multer();
const handleFileLoading = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.buffer) || !((_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.mimetype)) {
        next();
        return;
    }
    try {
        //initialize Firebase
        const firebaseApp = initializeFirebase();
        const storage = getStorage(firebaseApp);
        const currentAvatarUrl = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.avatar;
        //delete the previous file
        if (currentAvatarUrl) {
            try {
                const currentFileRef = ref(storage, currentAvatarUrl);
                yield (0, storage_1.deleteObject)(currentFileRef);
            }
            catch (error) {
                console.group(error);
            }
        }
        //create new file ref in Firebase
        const newFileRef = ref(storage, uuidv4());
        //upload new file
        yield uploadBytes(newFileRef, req.file.buffer, {
            contentType: req.file.mimetype,
        });
        //get new file link
        const downloadURL = yield (0, storage_1.getDownloadURL)(newFileRef);
        req.uploadedFilePath = downloadURL;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "error uploading file" });
    }
});
router.use(validateToken);
router.put("/", upload.single("file"), handleFileLoading);
router.use("/", controller.updateUser);
