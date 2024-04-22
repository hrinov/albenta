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
exports.getActivity = void 0;
const activityQueries_1 = require("../db/queries/activityQueries");
const getActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    if (!page) {
        // handle not all arguments
        return res.status(400).json({ message: "page is required" });
    }
    const startIndex = (+page - 1) * 10;
    const activity = yield (0, activityQueries_1.getAllUserActivity)(+req.user.id, startIndex);
    return res
        .status(200)
        .json({ success: true, data: activity.data, total: activity.total });
});
exports.getActivity = getActivity;
