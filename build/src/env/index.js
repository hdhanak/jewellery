"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/** export env constant */
exports.env = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    APPPORT: process.env.PORT,
    WEBSITE_URL: process.env.WEBSITE_URL,
    JWT_TIMEOUT_DURATION: process.env.JWT_TIMEOUT_DURATION,
    LOG_LEVEL: process.env.LOG_LEVEL,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    FCM_SERVER_KEY: process.env.FCM_SERVER_KEY,
    SITE_TITLE: process.env.SITE_TITLE,
    LOCAL_DB_URL: process.env.LOCAL_DB_URL
};
