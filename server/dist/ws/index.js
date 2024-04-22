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
exports.useWS = void 0;
const depositQueries_1 = require("../db/queries/depositQueries");
const useWS = (wss) => {
    wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?userId=")[1];
        if (!userId)
            return;
        let deposits = yield (0, depositQueries_1.findAll)(+userId);
        const getData = () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDate = new Date();
            let activeDeposits = deposits.filter((deposit) => {
                const createdAt = new Date(deposit.created_at);
                const endDate = new Date(createdAt.getTime() + deposit.hours * 60 * 60 * 1000);
                return endDate.getTime() > currentDate.getTime();
            });
            const getTimeToEnd = (end_date) => {
                const differenceMs = end_date.getTime() - Date.now();
                const totalHours = Math.floor(differenceMs / (1000 * 60 * 60));
                const hours = Math.floor(totalHours);
                let minutes = Math.floor((differenceMs / (1000 * 60)) % 60);
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                return `${hours}:${minutes}`;
            };
            activeDeposits = activeDeposits.map((deposit) => {
                const endDate = new Date(new Date(deposit.created_at).getTime() +
                    deposit.hours * 60 * 60 * 1000);
                return {
                    percent: deposit.percent,
                    timeToEnd: getTimeToEnd(endDate),
                };
            });
            return activeDeposits;
        });
        const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield getData();
            ws.send(JSON.stringify(data));
        });
        if (userId) {
            yield sendData();
            const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                yield sendData();
            }), 30000);
            ws.on("close", () => {
                clearInterval(interval);
            });
        }
    }));
};
exports.useWS = useWS;
