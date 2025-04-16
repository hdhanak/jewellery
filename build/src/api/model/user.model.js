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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsers = exports.EmailCheck = exports.ChangePassword = exports.LoginUser = exports.addUser = void 0;
const db_1 = require("../../config/db");
const logger_1 = require("../../lib/logger");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("../entity/user.entity");
const jwt_1 = require("../lib/jwt");
const constants_1 = require("../../config/constants");
function addUser(whereClause, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!whereClause || !userData) {
                throw new Error("Invalid parameters. Both whereClause and userData must be provided.");
            }
            const data = userData;
            data.password = data.password;
            console.log(data, 'data');
            const savedUserData = yield db_1.PostgresDataSource.manager.save(db_1.PostgresDataSource.manager.create(user_entity_1.Users, data));
            return savedUserData;
        }
        catch (error) {
            logger_1.logger.error(`Error adding user: ${error.message}`);
            throw error;
        }
    });
}
exports.addUser = addUser;
function LoginUser(where, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepository = db_1.PostgresDataSource.getRepository(user_entity_1.Users);
            const user = yield userRepository.findOne({
                where,
            });
            if (user) {
                const res = JSON.parse(JSON.stringify(user));
                var userdata = {
                    email: res.email,
                    user_id: res.id,
                };
                console.log(password);
                console.log(res.password);
                const validPassword = yield bcrypt_1.default.compare(password, res.password);
                console.log(validPassword, "validPassword");
                if (validPassword) {
                    console.log("1111");
                    const token = (0, jwt_1.sign)(userdata);
                    console.log("222");
                    console.log(token);
                    user.auth_token = token;
                    console.log(user, "user");
                    return user;
                }
                else {
                    console.log(validPassword, "validPassword");
                    return constants_1.Constants.USERS.INVALID_EMAIL_OR_PASSWORD;
                }
            }
            else {
                return "Invalid Email or Password!";
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.LoginUser = LoginUser;
function ChangePassword(email, newPassword, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var nPassword = yield bcrypt_1.default.hash(newPassword, 10);
        db_1.PostgresDataSource.manager.update(user_entity_1.Users, { email: email }, { password: nPassword }).then((response) => {
            if (response.affected) {
                callback("", response);
            }
            else {
                callback("Invalid Email Address", "");
            }
        }).catch((error) => {
            callback(error, "");
        });
    });
}
exports.ChangePassword = ChangePassword;
function EmailCheck(email, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = db_1.PostgresDataSource.getRepository(user_entity_1.Users);
        userRepository.findOne({ where: { email: email } }).then((response) => {
            if (response) {
                callback("", response);
            }
            else {
                callback("Invalid Email Address", "");
            }
        }).catch((error) => {
            callback(error, "");
        });
    });
}
exports.EmailCheck = EmailCheck;
function FindAllUsers(where, filter, offset, limit, orderField, order, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = db_1.PostgresDataSource.getRepository(user_entity_1.Users);
        if (Object.keys(where).length > 0) {
            if (filter !== "") {
                console.log("2");
                const [list, count] = yield userRepository
                    .createQueryBuilder("users")
                    .leftJoinAndSelect("users.role", "roles")
                    .leftJoinAndSelect("users.customerorg", "customerOrganization")
                    .leftJoinAndSelect("users.organizationAccess", "organizationAccess")
                    .leftJoinAndSelect("organizationAccess.custOrg", "custOrg")
                    .where(filter, {
                    firstName: where.firstName,
                    lastName: where.lastName,
                    email: where.email,
                    phone: where.phone,
                    status: where.status,
                    website: where.website,
                    roles: where.roles,
                    customerOrganization: where.customerOrganization
                })
                    .skip(offset)
                    .take(limit)
                    .orderBy(orderField, order)
                    .getManyAndCount();
                return callback("", list, count);
            }
        }
        else {
            const [list1, count1] = yield userRepository
                .createQueryBuilder("users")
                .leftJoinAndSelect("users.role", "roles")
                .leftJoinAndSelect("users.customerorg", "customerOrganization")
                .leftJoinAndSelect("users.organizationAccess", "organizationAccess")
                .leftJoinAndSelect("organizationAccess.custOrg", "custOrg")
                .skip(offset)
                .take(limit)
                .orderBy(orderField, order)
                .getManyAndCount();
            // const list1 = await userRepository
            //   .createQueryBuilder("users")
            //   .leftJoinAndSelect("users.role", "roles")
            //   .leftJoinAndSelect("users.customerorg", "customerOrganization")
            //   .leftJoinAndSelect("users.organizationAccess", "organizationAccess")
            //   .leftJoinAndSelect("organizationAccess.custOrg", "custOrg")
            //   .select(["users.id as id","users.firstName as firstName,organizationAccess.custOrg"])
            //   .skip(offset)
            //   .take(limit)
            //   .orderBy(orderField, order)
            //   .getRawMany();
            // const count1 = await userRepository
            //   .createQueryBuilder("users")
            //   .leftJoinAndSelect("users.role", "roles")
            //   .leftJoinAndSelect("users.customerorg", "customerOrganization")
            //   .leftJoinAndSelect("users.organizationAccess", "organizationAccess")
            //   .leftJoinAndSelect("organizationAccess.custOrg", "custOrg")
            //   .orderBy(orderField, order)
            //   .getCount();
            // .orderBy(`regulation.id`, `DESC`)
            return callback("", list1, count1);
        }
    });
}
exports.FindAllUsers = FindAllUsers;
