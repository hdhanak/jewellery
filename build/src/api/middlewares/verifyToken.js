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
// import { unauthorizedResponse, notFoundResponse } from '../helpers/apiResponse'
const constants_1 = require("../../config/constants");
const jwt_1 = require("../lib/jwt");
const apiResponse_1 = require("../../helpers/apiResponse");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    const accessToken = req.headers.authorization;
    if (accessToken) {
        const token = accessToken.split(' ')[1];
        const { decoded, expired } = (0, jwt_1.decode)(token);
        if (decoded) {
            // @ts-ignore
            req.user = decoded;
            console.log(req.user, '22');
            if (req.body.userId != undefined) {
                if (req.body.userId != "") {
                    if (req.body.userId != req.body.user.userId) {
                        (0, apiResponse_1.notFoundResponse)(res, constants_1.Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_INVALID_WITH_USERID);
                    }
                    else {
                        (0, apiResponse_1.unauthorizedResponse)(res, constants_1.Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_INVALID);
                    }
                }
                else {
                    return next();
                }
            }
            else {
                return next();
            }
        }
        if (expired) {
            (0, apiResponse_1.unauthorizedResponse)(res, constants_1.Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_EXPIRED);
        }
    }
    else {
        (0, apiResponse_1.unauthorizedResponse)(res, constants_1.Constants.ERROR_MESSAGES.AUTHORIZATION_REQUIRED);
    }
});
exports.default = verifyToken;
