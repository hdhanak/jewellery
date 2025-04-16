"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("./admin");
/** crate global router */
const createRouter = () => {
    const router = express_1.default.Router();
    (0, admin_1.AdminRoute)(router);
    return router;
};
exports.createRouter = createRouter;
