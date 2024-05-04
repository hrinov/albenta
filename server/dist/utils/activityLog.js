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
exports.handleUserActivity = void 0;
const activityQueries_1 = require("../db/queries/activityQueries");
const handleUserActivity = (userAgent, user_id, type) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const platform = (userAgent === null || userAgent === void 0 ? void 0 : userAgent.platform) || "Undefined";
    const browser = (userAgent === null || userAgent === void 0 ? void 0 : userAgent.browser) || "Undefined";
    const device = (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isMobile)
        ? "Mobile"
        : (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isTablet)
            ? "Tablet"
            : (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isDesktop)
                ? "Desktop"
                : "Undefined";
    const activityOptions = {
        platform,
        type,
        date,
        device,
        browser,
        user_id,
    };
    try {
        yield (0, activityQueries_1.addActivity)(activityOptions);
    }
    catch (error) {
        throw error;
    }
});
exports.handleUserActivity = handleUserActivity;
