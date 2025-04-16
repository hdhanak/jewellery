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
exports.getAllProducts = exports.getProducts = exports.deleteProductByIds = exports.updateProductById = exports.createProduct = void 0;
const logger_1 = require("../../lib/logger");
const apiResponse_1 = require("../../helpers/apiResponse");
const utility_1 = require("../../helpers/utility");
const constants_1 = require("../../config/constants");
const product_model_1 = require("../model/product.model");
const string_1 = require("fp-ts/lib/string");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = { email: req.body.email };
        if (!req.body.product_category_id) {
            return (0, apiResponse_1.ErrorResponse)(res, constants_1.Constants.PRODUCTS.INVALID_CATEGORY_ID);
        }
        const productImages = req.files.map(file => file.filename);
        console.log(req.user.user_id, "req.body.user");
        const payloadRequest = {
            product_code: req.body.product_code,
            product_name: req.body.product_name,
            product_title: req.body.product_title,
            product_detail: req.body.product_detail,
            product_sub_detail: req.body.product_sub_detail,
            product_images: productImages,
            product_category: parseInt(req.body.product_category_id, 10),
            product_type: parseInt(req.body.product_type, 10),
            occasion: req.body.occasion, // Assuming occasion is a comma-separated string
            gold_purity: parseInt(req.body.gold_purity, 10),
            gross_weight: parseFloat(req.body.gross_weight),
            gender: parseInt(req.body.gender, 10),
            height: parseFloat(req.body.height),
            width: parseFloat(req.body.width),
            size: req.body.size, // Assuming size is meant to remain a string
            diamond_clarity: parseInt(req.body.diamond_clarity, 10),
            diamond_color: req.body.diamond_color,
            diamond_weight: parseFloat(req.body.diamond_weight),
            no_of_diamonds: parseInt(req.body.no_of_diamonds, 10),
            metal: parseInt(req.body.metal_id, 10),
            diamond_price_per_item: parseFloat(req.body.diamond_price_per_item),
            extra_add_price: parseFloat(req.body.extra_add_price),
            status: req.body.status === 'true',
            users: req.user.user_id
        };
        const result = yield (0, product_model_1.addProduct)(where, payloadRequest);
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCTS.CREATED_SUCCESSFULLY, result);
    }
    catch (e) {
        console.log("Error: ", e);
        (0, apiResponse_1.ErrorResponse)(res, e.message ? e.message : e);
    }
});
exports.createProduct = createProduct;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
    try {
        let where = { id: req.body.id };
        const productImages = req.files.map(file => file.filename);
        const updateData = {
            product_code: (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.product_code) !== null && _b !== void 0 ? _b : undefined,
            product_name: (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.product_name) !== null && _d !== void 0 ? _d : undefined,
            product_title: (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.product_title) !== null && _f !== void 0 ? _f : undefined,
            product_detail: (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.product_detail) !== null && _h !== void 0 ? _h : undefined,
            product_sub_detail: (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.product_sub_detail) !== null && _k !== void 0 ? _k : undefined,
            product_category: ((_l = req.body) === null || _l === void 0 ? void 0 : _l.product_category) !== undefined ? parseInt((_m = req.body) === null || _m === void 0 ? void 0 : _m.product_category, 10) : undefined,
            product_type: ((_o = req.body) === null || _o === void 0 ? void 0 : _o.product_type) !== undefined ? parseInt((_p = req.body) === null || _p === void 0 ? void 0 : _p.product_type, 10) : undefined,
            gold_purity: ((_q = req.body) === null || _q === void 0 ? void 0 : _q.gold_purity) !== undefined ? parseInt((_r = req.body) === null || _r === void 0 ? void 0 : _r.gold_purity, 10) : undefined,
            gross_weight: ((_s = req.body) === null || _s === void 0 ? void 0 : _s.gross_weight) !== undefined ? parseFloat((_t = req.body) === null || _t === void 0 ? void 0 : _t.gross_weight) : undefined,
            gender: ((_u = req.body) === null || _u === void 0 ? void 0 : _u.gender) !== undefined ? parseInt((_v = req.body) === null || _v === void 0 ? void 0 : _v.gender, 10) : undefined,
            height: ((_w = req.body) === null || _w === void 0 ? void 0 : _w.height) !== undefined ? parseFloat((_x = req.body) === null || _x === void 0 ? void 0 : _x.height) : undefined,
            width: ((_y = req.body) === null || _y === void 0 ? void 0 : _y.width) !== undefined ? parseFloat((_z = req.body) === null || _z === void 0 ? void 0 : _z.width) : undefined,
            size: (_1 = (_0 = req.body) === null || _0 === void 0 ? void 0 : _0.size) !== null && _1 !== void 0 ? _1 : undefined,
            diamond_clarity: ((_2 = req.body) === null || _2 === void 0 ? void 0 : _2.diamond_clarity) !== undefined ? parseInt((_3 = req.body) === null || _3 === void 0 ? void 0 : _3.diamond_clarity, 10) : undefined,
            diamond_color: (_5 = (_4 = req.body) === null || _4 === void 0 ? void 0 : _4.diamond_color) !== null && _5 !== void 0 ? _5 : undefined,
            diamond_weight: ((_6 = req.body) === null || _6 === void 0 ? void 0 : _6.diamond_weight) !== undefined ? parseFloat((_7 = req.body) === null || _7 === void 0 ? void 0 : _7.diamond_weight) : undefined,
            no_of_diamonds: ((_8 = req.body) === null || _8 === void 0 ? void 0 : _8.no_of_diamonds) !== undefined ? parseInt((_9 = req.body) === null || _9 === void 0 ? void 0 : _9.no_of_diamonds, 10) : undefined,
            metal: ((_10 = req.body) === null || _10 === void 0 ? void 0 : _10.metal_id) !== undefined ? parseInt((_11 = req.body) === null || _11 === void 0 ? void 0 : _11.metal_id, 10) : undefined,
            diamond_price_per_item: ((_12 = req.body) === null || _12 === void 0 ? void 0 : _12.diamond_price_per_item) !== undefined ? parseFloat((_13 = req.body) === null || _13 === void 0 ? void 0 : _13.diamond_price_per_item) : undefined,
            extra_add_price: ((_14 = req.body) === null || _14 === void 0 ? void 0 : _14.extra_add_price) !== undefined ? parseFloat((_15 = req.body) === null || _15 === void 0 ? void 0 : _15.extra_add_price) : undefined,
            status: req.body.status === 'true' ? true : false,
        };
        // Remove undefined fields from updateData to avoid issues in the query
        const payloadRequest = Object.fromEntries(Object.entries(updateData).filter(([_, value]) => value !== undefined));
        const relationEntityPayloadRequest = {
            product_images: productImages.length > 0 ? productImages : req.body.product_images,
            occasion: req.body.occasion,
        };
        const result = yield (0, product_model_1.updateProduct)(where, payloadRequest, relationEntityPayloadRequest);
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCTS.UPDATED_SUCCESSFULLY, result);
    }
    catch (e) {
        console.log("Error: ", e);
        (0, apiResponse_1.ErrorResponse)(res, e.message ? e.message : e);
    }
});
exports.updateProductById = updateProductById;
const deleteProductByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids; // Assuming IDs are provided as a comma-separated string
        const idArray = ids.split(',').map(id => id.trim()); // Convert comma-separated string to array of IDs
        // const where: object = { id: In(idArray) }; // Assuming the primary key of the Product entity is named 'id'
        // Call deleteProduct function to delete product(s) by IDs
        const result = yield (0, product_model_1.deleteProduct)(idArray);
        // Return success response
        return (0, apiResponse_1.successMessage)(res, constants_1.Constants.PRODUCTS.DELETED_SUCCESSFULLY);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.deleteProductByIds = deleteProductByIds;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _16;
    try {
        const id = req.body.id; // Assuming IDs are provided as a comma-separated string
        const userId = ((_16 = req === null || req === void 0 ? void 0 : req.user) === null || _16 === void 0 ? void 0 : _16.user_id) || 1;
        const result = yield (0, product_model_1.findProduct)(userId, id);
        // Return success response
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCTS.RETRIEVED_SUCCESSFULLY, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.getProducts = getProducts;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _17, _18, _19, _20, _21, _22, _23;
    try {
        let { order_by } = (_17 = req.body) !== null && _17 !== void 0 ? _17 : {};
        // console.log(req.user.user_id,"req.body.user.userId");
        const userId = 1;
        let where = {};
        var searchArr = [];
        var filterArr = [];
        console.log("it sbackend");
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let skip = (req.body.pageNo) ? (0, utility_1.getOffset)(parseInt(req.body.pageNo), limit) : 0;
        var keys = req.body && req.body.filter && Object.keys((_18 = req === null || req === void 0 ? void 0 : req.body) === null || _18 === void 0 ? void 0 : _18.filter);
        if ((keys === null || keys === void 0 ? void 0 : keys.length) > 0) {
            for (const key in (_19 = req.body) === null || _19 === void 0 ? void 0 : _19.filter) {
                if (!(key == "limit" || key == "pageNo" || key == "customerOrganization" || key == "roles" || key == 'orderBy') && (((_20 = req.body) === null || _20 === void 0 ? void 0 : _20.filter[key]) || ((_21 = req.body) === null || _21 === void 0 ? void 0 : _21.filter[key]) == false)) {
                    if (req.body.filter[key]) {
                        if ((typeof req.body.filter[key] === "string" || typeof req.body.filter[key] === "number" || typeof req.body.filter[key] === "boolean") && req.body.filter[key] !== "") {
                            const value = `%${(0, string_1.toLowerCase)((req.body.filter[key]).toString())}%`;
                            if (key == 'occasion') {
                                searchArr.push(`cast(o.${key} AS VARCHAR) ILIKE '${value}'`);
                            }
                            else if (key == 'product_category_name') {
                                searchArr.push(`cast(pc.${key} AS VARCHAR) ILIKE '${value}'`);
                            }
                            else {
                                searchArr.push(`cast(p.${key} AS VARCHAR) ILIKE '${value}'`);
                            }
                        }
                    }
                }
                if (Array.isArray(req.body.filter[key]) && req.body.filter[key].length > 0) {
                    const value = req.body.filter[key];
                    const formattedValues = value.map((v) => `'${v}'`).join(", "); // Format array values into a SQL-compatible string
                    if (key === "occasion") {
                        filterArr.push(`o.${key} IN(${formattedValues})`);
                    }
                    else if (key === "product_category_name") {
                        filterArr.push(`pc.${key} IN(${formattedValues})`);
                    }
                    else {
                        filterArr.push(`p.${key} IN(${formattedValues})`);
                    }
                }
            }
        }
        let search = searchArr && (searchArr === null || searchArr === void 0 ? void 0 : searchArr.length) > 0 ? searchArr.join(" AND ") : ``;
        let filter = (filterArr === null || filterArr === void 0 ? void 0 : filterArr.length) > 0 ? filterArr.join(" AND ") : ``;
        var tableName = ((order_by === null || order_by === void 0 ? void 0 : order_by.field_name) == 'occasion') ? "o" : ((order_by === null || order_by === void 0 ? void 0 : order_by.field_name) == 'product_category_name') ? "pc" : "p";
        var fieldName = (_22 = order_by === null || order_by === void 0 ? void 0 : order_by.field_name) !== null && _22 !== void 0 ? _22 : "id";
        var orderField = `${tableName}.${fieldName}`;
        var order = (_23 = order_by === null || order_by === void 0 ? void 0 : order_by.order) !== null && _23 !== void 0 ? _23 : "DESC";
        console.log(where, "where");
        console.log(search, "search");
        console.log(filter, "filter");
        const result = yield (0, product_model_1.findAllProducts)(where, userId, skip, limit, orderField, order, search, filter);
        // Return success response
        return (0, apiResponse_1.successResponse)(res, constants_1.Constants.PRODUCTS.RETRIEVED_ALL_SUCCESSFULLY, result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
});
exports.getAllProducts = getAllProducts;
