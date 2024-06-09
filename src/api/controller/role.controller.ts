// import { Request, Response } from "express";
// import { logger } from "../../../../lib/logger";
// import {
//   ErrorResponse,
//   successResponse,
//   successResponseWithCount,
//   successResponseWithCountAndIds
// } from "../../../../helpers/apiResponse";
// import { getOffset } from "../../../../helpers/utility";

// import date from "date-and-time";
// import { addRole, deleteRole, FindAllRoles, updateRole } from "../../../../domain/models/role.model";
// import { deleteRegulator } from "../../../../domain/models/regulator.model";
// import { PostgresDataSource } from "../../../../config/db";
// import { Obligation } from "../../../../domain/entities/obligation";
// import { Role } from "../../../../domain/entities/role";
// import { toLowerCase } from "fp-ts/string";
// import { FindAllObligations } from "../../../../domain/models/obligation.model";

// export const createRole = (req: Request, res: Response): any => {
//   try {


//     let payloadRoleRequest: object = {
//       name: req.body.name,
//       createdDate: date.format(new Date(),
//         "YYYY-MM-DD HH:mm:ss")
//     };
//     let payloadPermissionRequest: object = req.body.permissions;

//     addRole(payloadRoleRequest, payloadPermissionRequest, (err: any, data: any) => {
//       console.log("Error", err);
//       console.log("success", data);
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponse(res, "Role Added Successfully", data);
//       }
//     });


//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// };
// export const editRole = (req: Request, res: Response): any => {
//   try {


//     let payloadRoleRequest: object = {
//       name: req.body.name,
//       createdDate: date.format(new Date(),
//         "YYYY-MM-DD HH:mm:ss")
//     };
//     let payloadPermissionRequest: object = req.body.permissions;
//     const roleId: any = req.body.id;
//     updateRole(payloadRoleRequest, payloadPermissionRequest, roleId, (err: any, data: any) => {
//       console.log("Error", err);
//       console.log("success", data);
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponse(res, "Role update Successfully", data);
//       }
//     });


//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// };
// export const removeRole = (req: Request, res: Response): any => {
//   try {

//     let roleId = req.query.id as string;

//     deleteRole(roleId, (err: any, data: any) => {
//       console.log("Error", err);
//       console.log("success", data);
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponse(res, "Role Deleted Successfully", data);
//       }
//     });


//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// };


// export const GetAllRoles = (req: Request, res: Response): any => {
//   try {
//     let {
//       orderBy
//     } = req.body ?? {};

//     let where: any = {};
//     let limit = (req.query.limit) ? parseInt(req.query.limit as string) : 10;
//     let skip = (req.query.pageNo) ? getOffset(parseInt(req.query.pageNo as string), limit) : 0;

//     var tableName = orderBy?.tableName ?? 'roles';
//     var fieldName = orderBy?.fieldName ?? 'id';

//     var orderField = `${tableName}.${fieldName}`;
//     var order = orderBy?.order ?? 'DESC';

//     FindAllRoles(where, skip, limit, orderField, order, async (err: any, data: any, count: number) => {
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponseWithCount(res, "Role Listed", data, count);
//       }
//     });

//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// };
