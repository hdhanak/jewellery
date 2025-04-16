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
exports.getAllProductCategory = exports.deleteProductCategoryByIds = exports.updateProductCategoryByID = exports.createProductCategory = void 0;
const logger_1 = require("../../lib/logger");
const apiResponse_1 = require("../../helpers/apiResponse");
const utility_1 = require("../../helpers/utility");
const constants_1 = require("../../config/constants");
const product_category_model_1 = require("../model/product_category.model");
const createProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = { email: req.body.email };
        const payloadRequest = {
            product_category_name: req.body.product_category_name,
            product_category_code: req.body.product_category_code,
            status: req.body.status
        };
        const result = yield (0, product_category_model_1.addProductCategory)(where, payloadRequest);
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCT_CATEGORIES.CREATED_SUCCESSFULLY, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.createProductCategory = createProductCategory;
const updateProductCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = { id: req.body.id };
        const payloadRequest = {
            product_category_name: req.body.product_category_name,
            product_category_code: req.body.product_category_code,
            status: req.body.status
        };
        const result = yield (0, product_category_model_1.updateProductCategory)(where, payloadRequest);
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCT_CATEGORIES.UPDATED_SUCCESSFULLY, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.updateProductCategoryByID = updateProductCategoryByID;
const deleteProductCategoryByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids; // Assuming IDs are provided as a comma-separated string
        const idArray = ids.split(',').map(id => id.trim()); // Convert comma-separated string to array of IDs
        console.log(idArray, "idArray");
        const result = yield (0, product_category_model_1.deleteProductCategory)(idArray);
        // Return success response
        return (0, apiResponse_1.successMessage)(res, constants_1.Constants.PRODUCT_CATEGORIES.DELETED_SUCCESSFULLY);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.deleteProductCategoryByIds = deleteProductCategoryByIds;
const getAllProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let { orderBy } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        let where = {};
        var filter = [];
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let skip = (req.body.pageNo) ? (0, utility_1.getOffset)(parseInt(req.body.pageNo), limit) : 0;
        // var keys = Object.keys(req.body);
        // if (keys.length > 0) {
        //     for (const key in req.body) {
        //         if (!(key == "limit" || key == "pageNo" || key == "customerOrganization" || key == "roles" || key == 'orderBy') && (req.body[key] || req.body[key] == false)) {
        //             if (req.body[key]) {
        //                 if ((typeof req.body[key] === "string" || typeof req.body[key] === "number" || typeof req.body[key] === "boolean") && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(users.${key} AS VARCHAR) ILIKE :${key}`);
        //                 }
        //             }
        //         }
        //         if (key == "roles") {
        //             if (req.body[key]) {
        //                 if (typeof req.body[key] === "string" && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(roles.name AS VARCHAR) ILIKE :${key}`);
        //                 }
        //             }
        //         } else if (key == "customerOrganization") {
        //             if (req.body[key]) {
        //                 if (typeof req.body[key] === "string" && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(customerOrganization.companyName AS VARCHAR) ILIKE :${key}`);
        //                 } else if (typeof req.body[key] === "number" && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(customerOrganization.id AS VARCHAR) ILIKE :${key}`);
        //                 }
        //             }
        //         }
        //     }
        // }
        // let str = filter.length > 0 ? filter.join(" AND ") : ``;
        console.log(where, "where");
        console.log(filter, "cond");
        var orderField = (_b = orderBy === null || orderBy === void 0 ? void 0 : orderBy.fieldName) !== null && _b !== void 0 ? _b : "id";
        var order = (_c = orderBy === null || orderBy === void 0 ? void 0 : orderBy.order) !== null && _c !== void 0 ? _c : "DESC";
        const result = yield (0, product_category_model_1.findAllProductsCategory)(where, skip, limit, orderField, order);
        // Return success response
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCT_CATEGORIES.RETRIEVED_ALL_SUCCESSFULLY, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.getAllProductCategory = getAllProductCategory;
