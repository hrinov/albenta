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
const geoip = require("geoip-country");
const handleUserActivity = (userIp, userAgent, user_id, type) => __awaiter(void 0, void 0, void 0, function* () {
    const convertIPv6toIPv4 = (ip) => {
        if (ip.startsWith("::ffff:")) {
            const ipv4Part = ip.split(":").pop();
            return ipv4Part;
        }
        return ip;
    };
    const date = new Date();
    const ip = +convertIPv6toIPv4(String(userIp));
    const geo = geoip.lookup(ip);
    const country = (geo === null || geo === void 0 ? void 0 : geo.country) || "Undefined";
    const browser = (userAgent === null || userAgent === void 0 ? void 0 : userAgent.browser) || "Undefined";
    const device = (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isMobile)
        ? "Mobile"
        : (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isTablet)
            ? "Tablet"
            : (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isDesktop)
                ? "Desktop"
                : "Undefined";
    const activityOptions = {
        ip,
        type,
        date,
        device,
        country,
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
