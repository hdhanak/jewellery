"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExistsError = exports.unauthorizedResponse = exports.validationErrorWithData = exports.notFoundResponse = exports.ErrorResponse = exports.successResponse = exports.successResponseWithCountAndIds = exports.successResponseWithCountWithProcessFLag = exports.successResponseWithCount = exports.successMessage = void 0;
const constants_1 = require("../config/constants");
/** success created */
const successMessage = (res, msg) => {
    const dataRes = {
        status: 1,
        message: msg
    };
    return res.status(constants_1.Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};
exports.successMessage = successMessage;
const successResponseWithCount = (res, msg, data, totalRecords) => {
    const dataRes = {
        status: 1,
        message: msg,
        totalRecords: totalRecords,
        data: data
    };
    return res.status(constants_1.Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};
exports.successResponseWithCount = successResponseWithCount;
const successResponseWithCountWithProcessFLag = (res, msg, data, totalRecords, processingCount) => {
    const dataRes = {
        status: 1,
        message: msg,
        isProcessing: processingCount > 0,
        totalRecords: totalRecords,
        data: data
    };
    return res.status(constants_1.Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};
exports.successResponseWithCountWithProcessFLag = successResponseWithCountWithProcessFLag;
const successResponseWithCountAndIds = (res, msg, data, totalRecords, ids) => {
    const dataRes = {
        status: 1,
        message: msg,
        totalRecords: totalRecords,
        ids: ids,
        data: data
    };
    return res.status(constants_1.Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};
exports.successResponseWithCountAndIds = successResponseWithCountAndIds;
/** success response with data */
const successResponse = (res, msg, data) => {
    const dataRes = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(constants_1.Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};
exports.successResponse = successResponse;
/** error code */
const ErrorResponse = (res, msg) => {
    const dataRes = {
        status: 0,
        message: msg,
    };
    return res.status(constants_1.Constants.ERROR_CODES.FAIL_CODE).json(dataRes);
};
exports.ErrorResponse = ErrorResponse;
/** not found code */
const notFoundResponse = (res, msg) => {
    const dataRes = {
        status: 0,
        message: msg,
        data: []
    };
    return res.status(constants_1.Constants.ERROR_CODES.NOT_FOUND_CODE).json(dataRes);
};
exports.notFoundResponse = notFoundResponse;
/** not found code */
const validationErrorWithData = (res, msg, data) => {
    const dataRes = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(constants_1.Constants.ERROR_CODES.REQUIRE_PARAMETER).json(dataRes);
};
exports.validationErrorWithData = validationErrorWithData;
/** for token expire */
const unauthorizedResponse = (res, msg) => {
    const dataRes = {
        status: 0,
        message: msg,
    };
    return res.status(constants_1.Constants.ERROR_CODES.UNAUTHORIZED_CODE).json(dataRes);
};
exports.unauthorizedResponse = unauthorizedResponse;
/** not found code */
const userExistsError = (res, msg) => {
    const dataRes = {
        status: 0,
        message: msg,
    };
    return res.status(constants_1.Constants.ERROR_CODES.USER_EXISTS).json(dataRes);
};
exports.userExistsError = userExistsError;
