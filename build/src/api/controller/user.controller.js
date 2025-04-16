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
exports.getAllUsers = exports.login = exports.signUp = void 0;
const logger_1 = require("../../lib/logger");
const apiResponse_1 = require("../../helpers/apiResponse");
const utility_1 = require("../../helpers/utility");
const string_1 = require("fp-ts/string");
const user_model_1 = require("../model/user.model");
const constants_1 = require("../../config/constants");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = { email: req.body.email };
        let payloadRequest = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            // role: req.body.role_id,
            status: req.body.status
        };
        const result = yield (0, user_model_1.addUser)(where, payloadRequest);
        console.log(result, "result");
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.USERS.USER_ADDED, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = { email: req.body.email.trim() };
        const result = yield (0, user_model_1.LoginUser)(where, req.body.password);
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.USERS.USER_LOGIN, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.login = login;
const getAllUsers = (req, res) => {
    var _a, _b, _c, _d;
    try {
        console.log(req.query, "req.params");
        let { orderBy } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        let where = {};
        var filter = [];
        let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
        let skip = (req.query.pageNo) ? (0, utility_1.getOffset)(parseInt(req.query.pageNo), limit) : 0;
        var keys = Object.keys(req.body);
        if (keys.length > 0) {
            for (const key in req.body) {
                if (!(key == "limit" || key == "pageNo" || key == "customerOrganization" || key == "roles" || key == 'orderBy') && (req.body[key] || req.body[key] == false)) {
                    if (req.body[key]) {
                        if ((typeof req.body[key] === "string" || typeof req.body[key] === "number" || typeof req.body[key] === "boolean") && req.body[key] !== "") {
                            where[`${key}`] = `%${(0, string_1.toLowerCase)((req.body[key]).toString())}%`;
                            filter.push(`cast(users.${key} AS VARCHAR) ILIKE :${key}`);
                        }
                    }
                }
                if (key == "roles") {
                    if (req.body[key]) {
                        if (typeof req.body[key] === "string" && req.body[key] !== "") {
                            where[`${key}`] = `%${(0, string_1.toLowerCase)((req.body[key]).toString())}%`;
                            filter.push(`cast(roles.name AS VARCHAR) ILIKE :${key}`);
                        }
                    }
                }
                else if (key == "customerOrganization") {
                    if (req.body[key]) {
                        if (typeof req.body[key] === "string" && req.body[key] !== "") {
                            where[`${key}`] = `%${(0, string_1.toLowerCase)((req.body[key]).toString())}%`;
                            filter.push(`cast(customerOrganization.companyName AS VARCHAR) ILIKE :${key}`);
                        }
                        else if (typeof req.body[key] === "number") {
                            where[`${key}`] = `%${(0, string_1.toLowerCase)((req.body[key]).toString())}%`;
                            filter.push(`cast(customerOrganization.id AS VARCHAR) ILIKE :${key}`);
                        }
                    }
                }
            }
        }
        let str = filter.length > 0 ? filter.join(" AND ") : ``;
        console.log(where, "where");
        console.log(filter, "cond");
        var tableName = (_b = orderBy === null || orderBy === void 0 ? void 0 : orderBy.tableName) !== null && _b !== void 0 ? _b : "users";
        var fieldName = (_c = orderBy === null || orderBy === void 0 ? void 0 : orderBy.fieldName) !== null && _c !== void 0 ? _c : "id";
        var orderField = (tableName !== 'customerOrganization') ? `${(0, string_1.toLowerCase)(tableName)}.${fieldName}` : `${tableName}.${fieldName}`;
        var order = (_d = orderBy === null || orderBy === void 0 ? void 0 : orderBy.order) !== null && _d !== void 0 ? _d : "DESC";
        (0, user_model_1.FindAllUsers)(where, str, skip, limit, orderField, order, (err, data, count) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return (0, apiResponse_1.ErrorResponse)(res, err);
            }
            else {
                return (0, apiResponse_1.successResponseWithCount)(res, "User Listed", data, count);
            }
        }));
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
};
exports.getAllUsers = getAllUsers;
