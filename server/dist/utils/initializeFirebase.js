"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebase = void 0;
require("dotenv").config();
const app_1 = require("firebase/app");
const initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    };
    return (0, app_1.initializeApp)(firebaseConfig);
};
exports.initializeFirebase = initializeFirebase;
