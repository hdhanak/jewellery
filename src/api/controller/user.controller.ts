import { Request, Response } from "express";
import { logger } from "../../lib/logger";
import {
    ErrorResponse,
    successResponse,
    successResponseWithCount
} from "../../helpers/apiResponse";
import { getOffset } from "../../helpers/utility";
import { toLowerCase } from "fp-ts/string";
import { FindAllUsers, LoginUser, addUser } from "../model/user.model";
import { Users } from "../entity/user.entity";
import { Constants } from "../../config/constants";
import internal from "stream";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: { email: string } = { email: req.body.email };
        let payloadRequest: Partial<Users> = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            role: req.body.role_id,
            status: req.body.status as boolean
        };

        const result = await addUser(where, payloadRequest);
        console.log(result, "result");
        return successResponse(res, Constants.USERS.USER_ADDED, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: object = { email: req.body.email.trim() };
        const result = await LoginUser(where, req.body.password);
        return successResponse(res, Constants.USERS.USER_LOGIN, result);

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const getAllUsers = (req: Request, res: Response): any => {
    try {
        console.log(req.query, "req.params");

        let {
            orderBy

        } = req.body ?? {};

        let where: any = {};
        var filter: any = [];


        let limit = (req.query.limit) ? parseInt(req.query.limit as string) : 10;
        let skip = (req.query.pageNo) ? getOffset(parseInt(req.query.pageNo as string), limit) : 0;

        var keys = Object.keys(req.body);
        if (keys.length > 0) {
            for (const key in req.body) {
                if (!(key == "limit" || key == "pageNo" || key == "customerOrganization" || key == "roles" || key == 'orderBy') && (req.body[key] || req.body[key] == false)) {
                    if (req.body[key]) {
                        if ((typeof req.body[key] === "string" || typeof req.body[key] === "number" || typeof req.body[key] === "boolean") && req.body[key] !== "") {
                            where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
                            filter.push(`cast(users.${key} AS VARCHAR) ILIKE :${key}`);
                        }

                    }
                }
                if (key == "roles") {
                    if (req.body[key]) {
                        if (typeof req.body[key] === "string" && req.body[key] !== "") {
                            where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
                            filter.push(`cast(roles.name AS VARCHAR) ILIKE :${key}`);
                        }

                    }
                } else if (key == "customerOrganization") {
                    if (req.body[key]) {
                        if (typeof req.body[key] === "string" && req.body[key] !== "") {
                            where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
                            filter.push(`cast(customerOrganization.companyName AS VARCHAR) ILIKE :${key}`);
                        } else if (typeof req.body[key] === "number" && req.body[key] !== "") {
                            where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
                            filter.push(`cast(customerOrganization.id AS VARCHAR) ILIKE :${key}`);
                        }

                    }
                }
            }
        }


        let str = filter.length > 0 ? filter.join(" AND ") : ``;
        console.log(where, "where");

        console.log(filter, "cond");

        var tableName = orderBy?.tableName ?? "users";

        var fieldName = orderBy?.fieldName ?? "id";


        var orderField = (tableName !== 'customerOrganization') ? `${toLowerCase(tableName)}.${fieldName}` : `${tableName}.${fieldName}`;
        var order = orderBy?.order ?? "DESC";


        FindAllUsers(where, str, skip, limit, orderField, order, async (err: any, data: any, count: number) => {
            if (err) {
                return ErrorResponse(res, err);
            } else {

                return successResponseWithCount(res, "User Listed", data, count);

            }
        });

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
