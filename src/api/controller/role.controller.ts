import { Request, Response } from "express";
import date from "date-and-time";
import { ErrorResponse, successResponse } from "../../helpers/apiResponse";
import { logger } from "../lib/logger";
import { addRole, updateRole } from "../model/role.model";
import { getOffset } from "../../helpers/utility";

export const createRole = (req: Request, res: Response): any => {
    try {
        const where = {}

        let payloadRoleRequest: object = {
            name: req.body.name
        };

        const result = addRole(where, payloadRoleRequest)
        return successResponse(res, "Role Added Successfully", result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const editRole = (req: Request, res: Response): any => {
    try {

        const where = { id: req.body.id }
        let payloadRoleRequest: object = {
            name: req.body.name,
            createdDate: date.format(new Date(),
                "YYYY-MM-DD HH:mm:ss")
        };
        let payloadPermissionRequest: object = req.body.permissions;
        const roleId: any = req.body.id;
        const updatedResult = updateRole(where, payloadRoleRequest)
        console.log(updatedResult, "updatedResult");
        return successResponse(res, "Role update Successfully", updatedResult);

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
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


export const GetAllRoles = (req: Request, res: Response): any => {
    try {
        let {
            orderBy
        } = req.body ?? {};

        let where: any = {};
        let limit = (req.query.limit) ? parseInt(req.query.limit as string) : 10;
        let skip = (req.query.pageNo) ? getOffset(parseInt(req.query.pageNo as string), limit) : 0;

        var tableName = orderBy?.tableName ?? 'roles';
        var fieldName = orderBy?.fieldName ?? 'id';

        var orderField = `${tableName}.${fieldName}`;
        var order = orderBy?.order ?? 'DESC';

        // FindAllRoles(where, skip, limit, orderField, order)
        // return successResponseWithCount(res, "Role Listed", data, count);

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
