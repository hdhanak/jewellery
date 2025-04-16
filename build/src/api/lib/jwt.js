"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomValueHex = exports.decode = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../../env");
const privateKey = env_1.env.JWT_SECRET;
/**
   * jwt signin
   * @param {string} value
  */
function sign(object, options) {
    const jwtData = {
        expiresIn: env_1.env.JWT_TIMEOUT_DURATION,
    };
    return jsonwebtoken_1.default.sign(object, privateKey, jwtData);
}
exports.sign = sign;
/**
   * jwt decode
   * @param {string} value
  */
function decode(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        return {
            valid: false,
            expired: error,
            decoded: null,
        };
    }
}
exports.decode = decode;
/**
   * generate random unique string
   * @param {string} value
  */
function randomValueHex(len) {
    return crypto_1.default.randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len).toUpperCase();
}
exports.randomValueHex = randomValueHex;
