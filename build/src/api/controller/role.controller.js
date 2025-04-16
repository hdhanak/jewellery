"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRoles = exports.editRole = exports.createRole = void 0;
const date_and_time_1 = __importDefault(require("date-and-time"));
const apiResponse_1 = require("../../helpers/apiResponse");
const logger_1 = require("../lib/logger");
const role_model_1 = require("../model/role.model");
const utility_1 = require("../../helpers/utility");
const createRole = (req, res) => {
    try {
        const where = {};
        let payloadRoleRequest = {
            name: req.body.name
        };
        const result = (0, role_model_1.addRole)(where, payloadRoleRequest);
        return (0, apiResponse_1.successResponse)(res, "Role Added Successfully", result);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
};
exports.createRole = createRole;
const editRole = (req, res) => {
    try {
        const where = { id: req.body.id };
        let payloadRoleRequest = {
            name: req.body.name,
            createdDate: date_and_time_1.default.format(new Date(), "YYYY-MM-DD HH:mm:ss")
        };
        let payloadPermissionRequest = req.body.permissions;
        const roleId = req.body.id;
        const updatedResult = (0, role_model_1.updateRole)(where, payloadRoleRequest);
        console.log(updatedResult, "updatedResult");
        return (0, apiResponse_1.successResponse)(res, "Role update Successfully", updatedResult);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
};
exports.editRole = editRole;
// export const removeRole = (req: Request, res: Response): any => {
//     try {
//         let roleId = req.query.id as string;
//         deleteRole(roleId, (err: any, data: any) => {
//             console.log("Error", err);
//             console.log("success", data);
//             if (err) {
//                 return ErrorResponse(res, err);
//             } else {
//                 return successResponse(res, "Role Deleted Successfully", data);
//             }
//         });
//     } catch (e) {
//         logger.error(e);
//         ErrorResponse(res, e);
//     }
// };
const GetAllRoles = (req, res) => {
    var _a, _b, _c, _d;
    try {
        let { orderBy } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        let where = {};
        let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
        let skip = (req.query.pageNo) ? (0, utility_1.getOffset)(parseInt(req.query.pageNo), limit) : 0;
        var tableName = (_b = orderBy === null || orderBy === void 0 ? void 0 : orderBy.tableName) !== null && _b !== void 0 ? _b : 'roles';
        var fieldName = (_c = orderBy === null || orderBy === void 0 ? void 0 : orderBy.fieldName) !== null && _c !== void 0 ? _c : 'id';
        var orderField = `${tableName}.${fieldName}`;
        var order = (_d = orderBy === null || orderBy === void 0 ? void 0 : orderBy.order) !== null && _d !== void 0 ? _d : 'DESC';
        // FindAllRoles(where, skip, limit, orderField, order)
        // return successResponseWithCount(res, "Role Listed", data, count);
    }
    catch (e) {
        logger_1.logger.error(e);
        (0, apiResponse_1.ErrorResponse)(res, e);
    }
};
exports.GetAllRoles = GetAllRoles;
