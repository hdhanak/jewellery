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
exports.FindAllRoles = exports.deleteRole = exports.updateRole = exports.addRole = void 0;
const db_1 = require("../../config/db");
const role_entity_1 = require("../entity/role.entity");
const logger_1 = require("../lib/logger");
const constants_1 = require("../../config/constants");
function addRole(whereClause, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!whereClause || !userData) {
                throw new Error("Invalid parameters. Both whereClause and userData must be provided.");
            }
            const where = JSON.parse(JSON.stringify(whereClause));
            const data = userData;
            const savedUserData = yield db_1.PostgresDataSource.manager.save(db_1.PostgresDataSource.manager.create(role_entity_1.Role, data));
            return savedUserData;
        }
        catch (error) {
            logger_1.logger.error(`Error adding user: ${error.message}`);
            throw error;
        }
    });
}
exports.addRole = addRole;
function updateRole(where, roleData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roles = JSON.parse(JSON.stringify(roleData));
            const updateResult = yield db_1.PostgresDataSource
                .createQueryBuilder()
                .update(role_entity_1.Role)
                .set(roleData)
                .where(where)
                .returning("*")
                .updateEntity(true)
                .execute();
            if (updateResult.affected === 0) {
                // throw new Error(Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
                return new Error(constants_1.Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
            }
            const updatedData = updateResult.raw[0];
            return updatedData;
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error(error);
        }
    });
}
exports.updateRole = updateRole;
function deleteRole(roleId, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (roleId === "1") {
                callback("This is Administrator Role. You will not delete this role, Please try to delete other role.", "");
            }
            else {
                yield db_1.PostgresDataSource
                    .createQueryBuilder()
                    .delete()
                    .from(role_entity_1.Role)
                    .where("id = :id", { id: roleId })
                    .execute().then((deleteRes) => {
                    console.log(deleteRes);
                    if (deleteRes.affected)
                        callback("", deleteRes);
                    else
                        callback("Invalid Role Id", "");
                }).catch(error => {
                    if (error.driverError !== undefined && error.driverError.detail !== undefined) {
                        var table = `${error.driverError.table}`.charAt(0).toUpperCase() + `${error.driverError.table}`.slice(1);
                        // if (table == "Disclosure_obligations_obligation") {
                        //     return callback(`Please unlink this record from Link-table`, '');
                        // }
                        return callback(`Please unlink this role from ${table}`, "");
                    }
                    else
                        callback(error, "");
                });
            }
        }
        catch (error) {
            callback("error", error);
        }
    });
}
exports.deleteRole = deleteRole;
function FindAllRoles(where, offset, limit, orderField, order, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleRepository = db_1.PostgresDataSource.getRepository(role_entity_1.Role);
        const [list, count] = yield db_1.PostgresDataSource
            .getRepository(role_entity_1.Role)
            .createQueryBuilder("roles")
            .leftJoinAndSelect("roles.rolesPermission", "permission")
            .leftJoinAndSelect("permission.permission", "permissiondetails")
            .leftJoinAndSelect("permission.roles", "roledetails")
            .orderBy(orderField, order)
            .getManyAndCount();
        callback("", list, count);
    });
}
exports.FindAllRoles = FindAllRoles;
