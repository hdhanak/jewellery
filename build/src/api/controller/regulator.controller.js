"use strict";
// import { logger } from "../../../../lib/logger";
// import {
//   ErrorResponse,
//   successResponse,
//   successResponseWithCount,
//   successResponseWithCountAndIds
// } from "../../../../helpers/apiResponse";
// import { getOffset } from "../../../../helpers/utility";
// import { Request, Response } from "express";
// import { addUser, CheckEmailExist } from "../../../../domain/models/user.model";
// import date from "date-and-time";
// import {
//   addRegulator,
//   updateRegulator,
//   deleteRegulator,
//   FindAllRegulators,
//   RegulatorList,
// } from "../../../../domain/models/regulator.model";
// import { toLowerCase } from "fp-ts/lib/string";
// import { ILike } from "typeorm";
// import { array } from "io-ts";
// import moment from "moment";
// const fs = require('fs');
// var csv = require("csvtojson");
// import multer from "multer";
// import { decode, encode } from "iconv-lite";
// // const upload = multer({storage: multer.memoryStorage()})
// // const upload = multer({ dest: 'tmp/csv/' });
// export const insertRegulator = (req: Request, res: Response): any => {
//   try {
//     let payloadRequest: object = {
//       regulatorShortName: req.body.regulatorShortName.trim(),
//       regulatorLongName: req.body.regulatorLongName,
//       regulatorDesc: req.body.regulatorDesc,
//       regulatorMainUrl: req.body.regulatorMainUrl,
//       regulatorUpdateSource: req.body.regulatorUpdateSource,
//       regulatorUpdateContact: req.body.regulatorUpdateContact,
//       country: req.body.country,
//       county:req.body.county,
//       state: req.body.state,
//       //      jurisdiction: req.body.jurisdiction,
//       status: req.body.status as boolean,
//       createdDate: date.format(new Date(),
//         'YYYY-MM-DD HH:mm:ss')
//     };
//     addRegulator(payloadRequest, (err: any, data: any) => {
//       console.log("Error", err);
//       console.log("success", data);
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponse(res, "Regulator Added Successfully", data);
//       }
//     });
//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// }
// export const editRegulator = (req: Request, res: Response): any => {
//   try {
//     let where: object = {
//       id: req.body.id,
//     };
//     let payloadRequest: object = {
//       regulatorShortName: req.body.regulatorShortName.trim(),
//       regulatorLongName: req.body.regulatorLongName,
//       regulatorDesc: req.body.regulatorDesc,
//       regulatorMainUrl: req.body.regulatorMainUrl,
//       regulatorUpdateSource: req.body.regulatorUpdateSource,
//       regulatorUpdateContact: req.body.regulatorUpdateContact,
//       country: req.body.country,
//       county:req.body.county,
//       state: req.body.state,
//       //  jurisdiction: req.body.jurisdiction,
//       status: req.body.status as boolean,
//       updatedDate: date.format(new Date(),
//         'YYYY-MM-DD HH:mm:ss')
//     };
//     updateRegulator(payloadRequest, where, (err: any, data: any) => {
//       console.log("Error", err);
//       console.log("success", data);
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponse(res, "Regulator Updated Successfully", data);
//       }
//     });
//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// }
// export const removeRegulator = (req: Request, res: Response): any => {
//   try {
//     let regulatorId = req.query.id as string
//     deleteRegulator(regulatorId, (err: any, data: any) => {
//       console.log("Error", err);
//       console.log("success", data);
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponse(res, "Regulator Deleted Successfully", data);
//       }
//     });
//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// }
// export const GetAllRegulators = (req: Request, res: Response): any => {
//   try {
//     let {
//       regulatorShortName,
//       regulatorLongName,
//       regulatorDesc,
//       regulatorMainUrl,
//       regulatorUpdateSource,
//       regulatorUpdateContact,
//       updatedDate,
//       country,
//       county,
//       state,
//       orderBy
//     } = req.body
//     var filter: any = []
//     let where: any = {};
//     var filterArr = []
//     let whereFilterArr: any = {}
//     let limit = (req.query.limit) ? parseInt(req.query.limit as string) : 10;
//     let skip = (req.query.pageNo) ? getOffset(parseInt(req.query.pageNo as string), limit) : 0;
//     let customerorgId = req.body.customerorgId
//     // if (req.body && Object.keys(req.body).length > 0) {
//     //   if (regulatorShortName) {
//     //     if (typeof regulatorShortName === 'string' && regulatorShortName !== "") {
//     //       where.regShortName = `%${toLowerCase(regulatorShortName.toString() as string)}%`
//     //       filter.push("regulator.regulatorShortName ILIKE :regShortName")
//     //     }
//     //     if (Array.isArray(regulatorShortName) && regulatorShortName.length > 0) {
//     //       console.log(regulatorShortName, 'regulatorShortName');
//     //       where.regShortName = regulatorShortName
//     //       filterArr.push("regulator.regulatorShortName IN(:...regShortName)")
//     //     }
//     //   }
//     //   if (regulatorLongName) {
//     //     if (typeof regulatorLongName === 'string' && regulatorLongName !== "") {
//     //       where.regLongName = `%${toLowerCase(regulatorLongName.toString() as string)}%`
//     //       filter.push("regulator.regulatorLongName ILIKE :regLongName")
//     //     }
//     //     if (Array.isArray(regulatorLongName) && regulatorLongName.length > 0) {
//     //       console.log(regulatorLongName, 'regulatorLongName');
//     //       where.regLongName = regulatorLongName
//     //       filterArr.push("regulator.regulatorLongName IN(:...regLongName)")
//     //     }
//     //   }
//     //   if (regulatorDesc) {
//     //     if (typeof regulatorDesc === 'string' && regulatorDesc !== "") {
//     //       where.regDescription = `%${toLowerCase(regulatorDesc.toString() as string)}%`
//     //       filter.push("regulator.regulatorDesc ILIKE :regDescription")
//     //     }
//     //     if (Array.isArray(regulatorDesc) && regulatorDesc.length > 0) {
//     //       console.log(regulatorDesc, 'regulatorDesc');
//     //       where.regDescription = regulatorDesc
//     //       filterArr.push("regulator.regulatorDesc IN(:...regDescription)")
//     //     }
//     //   }
//     //   if (regulatorMainUrl) {
//     //     if (typeof regulatorMainUrl === 'string' && regulatorMainUrl !== "") {
//     //       where.regulatorMainUrl = `%${toLowerCase(regulatorMainUrl.toString() as string)}%`
//     //       filter.push("regulator.regulatorMainUrl ILIKE :regulatorMainUrl")
//     //     }
//     //     if (Array.isArray(regulatorMainUrl) && regulatorMainUrl.length > 0) {
//     //       console.log(regulatorMainUrl, 'regulatorMainUrl');
//     //       where.regulatorMainUrl = regulatorMainUrl
//     //       filterArr.push("regulator.regulatorMainUrl IN(:...regulatorMainUrl)")
//     //     }
//     //   }
//     //   if (regulatorUpdateSource) {
//     //     if (typeof regulatorUpdateSource == "string" && regulatorUpdateSource !== "") {
//     //       where.regulatorUpdateSource = `%${toLowerCase(regulatorUpdateSource.toString() as string)}%`
//     //       filter.push("regulator.regulatorUpdateSource ILIKE :regulatorUpdateSource")
//     //     }
//     //     if (Array.isArray(regulatorUpdateSource) && regulatorUpdateSource.length > 0) {
//     //       console.log(regulatorUpdateSource, 'regulatorUpdateSource');
//     //       where.regulatorUpdateSource = regulatorUpdateSource
//     //       filterArr.push("regulator.regulatorUpdateSource IN(:...regulatorUpdateSource)")
//     //     }
//     //   }
//     //   if (regulatorUpdateContact) {
//     //     if ((typeof regulatorUpdateContact === 'string' || typeof regulatorUpdateContact === 'number' || typeof regulatorUpdateContact === 'boolean') && regulatorUpdateContact !== "") {
//     //       where.regulatorUpdateContact = `%${toLowerCase(regulatorUpdateContact.toString() as string)}%`
//     //       filter.push("regulator.regulatorUpdateContact ILIKE :regulatorUpdateContact")
//     //     }
//     //     if (Array.isArray(regulatorUpdateContact) && regulatorUpdateContact.length > 0) {
//     //       console.log(regulatorUpdateContact, 'regulatorUpdateContact');
//     //       where.regulatorUpdateContact = regulatorUpdateContact
//     //       filterArr.push("regulator.regulatorUpdateContact IN(:...regulatorUpdateContact)")
//     //     }
//     //   }
//     //   if (updatedDate) {
//     //     if ((typeof updatedDate == "string" || typeof regulatorUpdateContact === 'number' || typeof regulatorUpdateContact === 'boolean') && updatedDate !== "") {
//     //       where.updatedDate = `%${toLowerCase(updatedDate.toString() as string)}%`
//     //       filter.push("cast(regulator.updatedDate AS VARCHAR) ILIKE :updatedDate")
//     //     }
//     //     if (Array.isArray(updatedDate) && updatedDate.length > 0) {
//     //       where.updatedDate = updatedDate
//     //       filterArr.push(`DATE_TRUNC('day', "updatedDate") IN(:...updatedDate)`)
//     //     }
//     //   }
//     //   if (country) {
//     //     if (typeof country == "string" && country !== "") {
//     //       where.country = `%${toLowerCase(country.toString() as string)}%`
//     //       filter.push("regulator.country ILIKE :country")
//     //     }
//     //     if (Array.isArray(country) && country.length > 0) {
//     //       console.log(country, 'country');
//     //       where.country = country
//     //       filterArr.push("regulator.country IN(:...country)")
//     //     }
//     //   }
//     //  // if (county) {
//     //   console.log(typeof county);
//     //     if (typeof county == "string" && county !== "") {
//     //       where.county = `%${toLowerCase(county.toString() as string)}%`
//     //       filter.push("regulator.county ILIKE :county")
//     //     }
//     //     else if(county!==undefined && !Array.isArray(county))
//     //     {
//     //       where.county = `${county}`
//     //       filter.push("regulator.county = :county")
//     //     }
//     //     if (Array.isArray(county)) {
//     //       console.log(county, 'county');
//     //       where.county = county
//     //       filterArr.push("regulator.county IN(:...county)")
//     //     }
//     //  // }
//     //   if (state) {
//     //     if (typeof state == "string" && state !== "") {
//     //       where.state = `%${toLowerCase(state.toString() as string)}%`
//     //       filter.push("regulator.state ILIKE :state")
//     //     }
//     //     if (Array.isArray(state) && state.length > 0) {
//     //       console.log(state, 'state');
//     //       where.state = state
//     //       filterArr.push("regulator.state IN(:...state)")
//     //     }
//     //   }
//     // }
//     var keys = Object.keys(req.body);
//     var filterArr = [];
//     if (keys.length > 0) {
//       for (const key in req.body) {
//         if (!(key == "limit" || key == "pageNo" || key == "user" || key == "regAuthoringRegulator" || key == "regulatorId" ||  key == "orderBy" || key=='customerorgId') && (req.body[key] || req.body[key] == false)) {
//           if (req.body[key]) {
//             if ((typeof req.body[key] === "string" || typeof req.body[key] === "number" || typeof req.body[key] === "boolean") && req.body[key] !== "") {
//               where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
//               filter.push(`cast(regulator.${key} AS VARCHAR) ILIKE :${key}`);
//             }
//             if (Array.isArray(req.body[key]) && req.body[key].length > 0) {
//               if (key == "createdDate" || key == "updatedDate") {
//                 console.log("15");
//                 where[`${key}`] = req.body[key];
//                 filterArr.push(`DATE_TRUNC('day', regulator.${key}) IN(:...${key})`);
//               } else {
//                 where[`${key}`] = req.body[key];
//                 filterArr.push(`regulator.${key} IN(:...${key})`);
//               }
//             }
//           }
//         }
//       }
//     }
//     let str = filter.length > 0 ? filter.join(" AND ") : ``;
//     let str1 = filterArr.length > 0 ? filterArr.join(" AND ") : ``;
//     console.log(where, "where");
//     console.log(filter, "cond");
//     var tableName = orderBy?.tableName ?? 'regulator';
//     var fieldName = orderBy?.fieldName ?? 'id';
//     var orderField = `${tableName}.${fieldName}`;
//     // var orderField = (orderBy && orderBy.fieldName ) ? `regulator.${orderBy?.fieldName}` : 'regulator.id';
//     var order = orderBy?.order ?? 'DESC';
//     FindAllRegulators(where, str, str1, skip, limit, orderField, order,customerorgId, async (err: any, data: any, count: number,ids:any) => {
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponseWithCountAndIds(res, "Regulator Listed", data, count,ids);
//       }
//     });
//     // }
//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// };
// export const exportRegulators = (req: Request, res: Response): any => {
//   try {
//     let where: any = {};
//     var filter: any = []
//     let regulatorIds = req.body.regulatorIds && (req.body.regulatorIds as string).split(',').map((id: any) => Number(id))
//     console.log(regulatorIds, 'regulatorIds');
//     var keys = Object.keys(req.body)
//     console.log(keys, 'keys');
//     var filterArr = []
//     if (keys.length > 0) {
//       for (const key in req.body) {
//         if (!(key == 'limit' || key == 'pageNo' || key == 'user' || key == 'regulatorIds' || key=='customerorgId') && (req.body[key] || req.body[key] == false)) {
//           if (req.body[key]) {
//             if ((typeof req.body[key] === 'string' || typeof req.body[key] === 'number' || typeof req.body[key] === 'boolean') && req.body[key] !== "") {
//               where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`
//               filter.push(`cast(regulator.${key} AS VARCHAR) ILIKE :${key}`)
//             }
//             if (Array.isArray(req.body[key]) && req.body[key].length > 0) {
//               if (key == 'regEffectiveDate' || key == 'updatedDate') {
//                 console.log('15');
//                 where[`${key}`] = req.body[key]
//                 filterArr.push(`DATE_TRUNC('day', regulator.${key}) IN(:...${key})`)
//               } else {
//                 where[`${key}`] = req.body[key]
//                 filterArr.push(`regulator.${key} IN(:...${key})`)
//               }
//             }
//           }
//         }
//       }
//     }
//     let str = filter.length > 0 ? filter.join(" AND ") : ``
//     let str1 = filterArr.length > 0 ? filterArr.join(" AND ") : ``
//     console.log(where, 'where');
//     console.log(filter, 'cond');
//     var tableName = req.body.orderBy?.tableName ?? 'regulator';
//     var fieldName = req.body.orderBy?.fieldName ?? 'id';
//     var orderField = `${tableName}.${fieldName}`;
//     var order = req.body.orderBy?.order ?? 'DESC';
//     const userId = req.body.user.user_id
//     const customerorgId = Number(req.body.customerorgId)
//     RegulatorList(regulatorIds,userId,customerorgId, where, str, str1,orderField, order,async (err: any, data: any, count: number) => {
//       if (err) {
//         return ErrorResponse(res, err);
//       } else {
//         return successResponseWithCount(res, "Regulator Listed", data, count);
//       }
//     });
//     // }
//   } catch (e) {
//     logger.error(e);
//     ErrorResponse(res, e);
//   }
// };
// export const importRegulators = async (req: Request, res: Response): Promise<any> => {
//   try {
//     multer({
//       dest: 'tmp/csv/',
//       fileFilter: (req, file, cb) => {
//         if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
//           cb(null, true)
//         } else {
//           cb(null, false)
//           // return ErrorResponse(res, 'Upload Valid CSV File Only!')
//         }
//       }
//     }).single("file")(req, res, async (err) => {
//       if (!req.file) {
//         return ErrorResponse(res, 'Upload Valid CSV File Only');
//       } else {
//         var filepath: any = req.file?.path as any;
//         console.log("csv path", filepath);
//         var errorCount: number = 0;
//         var contentLength: number = 0;
//         var buffer = fs.readFileSync(filepath);
//         var output = encode(decode(buffer, "win1250"), "utf-8");
//         await csv({
//           headers: ["regulatorShortName", "regulatorLongName", "regulatorDesc", "regulatorMainUrl", "regulatorUpdateSource", "regulatorUpdateContact", "country", "state","county"]
//         }).fromString(output.toString()).then(async (jsonObj: any) => {
//           console.log("csv", jsonObj);
//           contentLength = jsonObj.length;
//           for (const regulator of jsonObj) {
//             if (regulator.regulatorShortName || regulator.regulatorLongName || regulator.regulatorDesc ||
//               regulator.regulatorMainUrl || regulator.regulatorUpdateSource || regulator.regulatorUpdateContact) {
//               let payloadRequest: object = {
//                 regulatorShortName: regulator.regulatorShortName.trim(),
//                 regulatorLongName: regulator.regulatorLongName,
//                 regulatorDesc: regulator.regulatorDesc ?? '',
//                 regulatorMainUrl: regulator.regulatorMainUrl ?? '',
//                 regulatorUpdateSource: regulator.regulatorUpdateSource ?? '',
//                 regulatorUpdateContact: regulator.regulatorUpdateContact ?? '',
//                 country: regulator.country ?? '',
//                 county: regulator.county ?? '',
//                 state: regulator.state ?? '',
//                 //      jurisdiction: req.body.jurisdiction,
//                 status: true,
//                 createdDate: date.format(new Date(),
//                   "YYYY-MM-DD HH:mm:ss")
//               };
//               await addRegulator(payloadRequest, (err: any, data: any) => {
//                 // console.log("Error", err);
//                 console.log("success", data);
//                 if (err) {
//                   logger.error(err);
//                   if (err.includes("regulatorShortName"))
//                     errorCount++;
//                   // return ErrorResponse(res, err);
//                 }
//               });
//             }
//           }
//           fs.unlinkSync(filepath);
//         });
//         var msg: string = errorCount > 0 ? (contentLength == errorCount ? "Nothing Imported, Each Regulators Short Names are already in Use." : "Regulators Imported Successfully, Some Were Omitted due to Short Name(s) Already in Use.") : "Regulators Imported Successfully";
//         if (errorCount > 0 && contentLength == errorCount)
//           return ErrorResponse(res, "Nothing Imported, Each Regulators Short Names are already in Use.")
//         return successResponse(res, msg, {
//           isError: (errorCount > 0) as Boolean,
//           success: (errorCount > 0 ? (contentLength != errorCount) : true) as Boolean
//         });
//       }
//     });
//   } catch (e) {
//     logger.error(e);
//     return ErrorResponse(res, e);
//   }
// };
