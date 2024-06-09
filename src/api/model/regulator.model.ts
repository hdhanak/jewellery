// import { PostgresDataSource } from "../../config/db";
// import { Regulators } from "../entities/regulators";
// import { logger } from "../../lib/logger";
// import { response } from "express";
// import { Regulator_organization } from "../entities/Regulator_organization";
// import { CustomerOrganization } from "../entities/customerOrganization";
// import { Users } from "../entities/users";
// import { custObligations } from "../entities/custObligations";

// export async function addRegulator(data: object, callback: any) {
//   try {
//     const res = JSON.parse(JSON.stringify(data));
//     console.log("147.......");

//     await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Regulators, res), callback)
//       .then(async (regulator) => {
//         console.log('1....');
//         if (regulator) {
//           callback("", regulator);
//         } else {
//           callback(regulator, '');
//         }
//       }).catch((error: any) => {
//         console.log("error...344444444.", error);

//         return callback(error.driverError.detail, "");
//       });
//   } catch (error: any) {
//     console.log("error....", error);

//     callback(error, '');
//   }
// }
// export async function updateRegulator(data: object, where: object, callback: any) {
//   try {
//     const res = JSON.parse(JSON.stringify(data));
//     const whereRes = JSON.parse(JSON.stringify(where));
//     PostgresDataSource.manager.update(Regulators, whereRes.id, res).then(async (updatedRegulator) => {
//       console.log(updatedRegulator);
//       if (updatedRegulator) {
//         callback("", updatedRegulator);
//       } else {
//         callback(updatedRegulator, '');
//       }
//     }).catch((error: any) => {
//       callback(error, '');
//     });
//   } catch (error: any) {
//     callback(error, '');
//   }
// }
// export async function deleteRegulator(regulatorId: string, callback: any) {
//   try {

//     await PostgresDataSource
//       .createQueryBuilder()
//       .delete()
//       .from(Regulators)
//       .where("id = :id", { id: regulatorId })
//       .execute().then((deleteRes) => {
//         console.log(deleteRes)
//         if (deleteRes.affected)
//           callback("", deleteRes);
//         else
//           callback("Invalid Regulator Id", "");
//       }).catch(error => {
//         if (error.driverError !== undefined && error.driverError.detail !== undefined) {
//           var table = `${error.driverError.table}`.charAt(0).toUpperCase() + `${error.driverError.table}`.slice(1)
//           callback(`Please unlink this record from ${table}`, '');
//         }
//         else callback(error, '');
//       });
//   } catch (error: any) {
//     callback(error, '');
//   }
// }
// // export async function FindAllRegulators(where: any, filter: string, filterArr: string, offset: number, limit: number, orderField: string, order: any, callback: any) {
// //   console.log(filterArr, 'where model');

// //   const regulatorRepository = PostgresDataSource.getRepository(Regulators);

// //   if (Object.keys(where).length > 0) {

// //     if (filter !== "" && filterArr !== "") {
// //       console.log("1");

// //       const [list, count] = await regulatorRepository

// //         .createQueryBuilder('regulator')
// //         .where(filter,
// //           {
// //             regShortName: where.regShortName,
// //             regLongName: where.regLongName,
// //             regDescription: where.regDescription,
// //             regulatorMainUrl: where.regulatorMainUrl,
// //             regulatorUpdateSource: where.regulatorUpdateSource,
// //             regulatorUpdateContact: where.regulatorUpdateContact,
// //             country: where.country,
// //             county:where.county,
// //             updatedDate: where.updatedDate,
// //             state: where.state,
// //           })
// //         .andWhere(filterArr, {
// //           regShortName: where.regShortName,
// //           regLongName: where.regLongName,
// //           regDescription: where.regDescription,
// //           regulatorMainUrl: where.regulatorMainUrl,
// //           regulatorUpdateSource: where.regulatorUpdateSource,
// //           regulatorUpdateContact: where.regulatorUpdateContact,
// //           country: where.country,
// //           county:where.county,
// //           updatedDate: where.updatedDate,
// //           state: where.state,

// //         })
// //         .skip(offset)
// //         .take(limit)
// //         .orderBy(orderField, order)
// //         .getManyAndCount()
// // var ids=await regulatorRepository.createQueryBuilder('regulator').select(["array_to_string(ARRAY_AGG(id),',') as ids"]) .where(filter,
// //   {
// //     regShortName: where.regShortName,
// //     regLongName: where.regLongName,
// //     regDescription: where.regDescription,
// //     regulatorMainUrl: where.regulatorMainUrl,
// //     regulatorUpdateSource: where.regulatorUpdateSource,
// //     regulatorUpdateContact: where.regulatorUpdateContact,
// //     country: where.country,
// //     county:where.county,
// //     updatedDate: where.updatedDate,
// //     state: where.state,
// //   })
// //   .andWhere(filterArr, {
// //     regShortName: where.regShortName,
// //     regLongName: where.regLongName,
// //     regDescription: where.regDescription,
// //     regulatorMainUrl: where.regulatorMainUrl,
// //     regulatorUpdateSource: where.regulatorUpdateSource,
// //     regulatorUpdateContact: where.regulatorUpdateContact,
// //     country: where.country,
// //     county:where.county,
// //     updatedDate: where.updatedDate,
// //     state: where.state,

// //   }).getRawOne();
// // console.log(ids,'ids');
// // //array_to_string(ARRAY_AGG(id),',') as ids
// // ids=ids.ids?ids.ids:'';
// //       return callback("", list, count,ids);

// //     } else if (filter !== "") {
// //       console.log("2");
// //       const [list, count] = await regulatorRepository
// //         .createQueryBuilder('regulator')
// //         .where(filter,
// //           {
// //             regShortName: where.regShortName,
// //             regLongName: where.regLongName,
// //             regDescription: where.regDescription,
// //             regulatorMainUrl: where.regulatorMainUrl,
// //             regulatorUpdateSource: where.regulatorUpdateSource,
// //             regulatorUpdateContact: where.regulatorUpdateContact,
// //             country: where.country,
// //             county:where.county,
// //             updatedDate: where.updatedDate,
// //             state: where.state,
// //           })
// //         .skip(offset)
// //         .take(limit)
// //         .orderBy(orderField, order)
// //         .getManyAndCount()
// //       var ids=await regulatorRepository.createQueryBuilder('regulator').select(["array_to_string(ARRAY_AGG(id),',') as ids"]).where(filter,
// //         {
// //           regShortName: where.regShortName,
// //           regLongName: where.regLongName,
// //           regDescription: where.regDescription,
// //           regulatorMainUrl: where.regulatorMainUrl,
// //           regulatorUpdateSource: where.regulatorUpdateSource,
// //           regulatorUpdateContact: where.regulatorUpdateContact,
// //           country: where.country,
// //           county:where.county,
// //           updatedDate: where.updatedDate,
// //           state: where.state,
// //         }).getRawOne();
// //       console.log(ids,'ids');
// //       ids=ids.ids?ids.ids:'';
// //       return callback("", list, count,ids);
// //     } else {
// //       console.log("3");
// //       const [list, count] = await regulatorRepository
// //         .createQueryBuilder('regulator')
// //         .where(filterArr,
// //           {
// //             regShortName: where.regShortName,
// //             regLongName: where.regLongName,
// //             regDescription: where.regDescription,
// //             regulatorMainUrl: where.regulatorMainUrl,
// //             regulatorUpdateSource: where.regulatorUpdateSource,
// //             regulatorUpdateContact: where.regulatorUpdateContact,
// //             country: where.country,
// //             county:where.county,
// //             updatedDate: where.updatedDate,
// //             state: where.state,
// //           })
// //         .skip(offset)
// //         .take(limit)
// //         .orderBy(orderField, order)
// //         .getManyAndCount()
// //       var ids=await regulatorRepository.createQueryBuilder('regulator').select(["array_to_string(ARRAY_AGG(id),',') as ids"]).where(filterArr,
// //         {
// //           regShortName: where.regShortName,
// //           regLongName: where.regLongName,
// //           regDescription: where.regDescription,
// //           regulatorMainUrl: where.regulatorMainUrl,
// //           regulatorUpdateSource: where.regulatorUpdateSource,
// //           regulatorUpdateContact: where.regulatorUpdateContact,
// //           country: where.country,
// //           county:where.county,
// //           updatedDate: where.updatedDate,
// //           state: where.state,
// //         }).getRawOne();
// //       console.log(ids,'ids');
// //       ids=ids.ids?ids.ids:'';
// //       return callback("", list, count,ids);
// //     }
// //   } else {
// //     console.log("4");
// //     var ids:any="";
// //     const [list, count] = await regulatorRepository
// //       .createQueryBuilder('regulator')
// //       .skip(offset)
// //       .take(limit)
// //       .orderBy(orderField, order)
// //       .getManyAndCount()
// //     return callback("", list, count,ids);
// //   }

// // }

// export async function FindAllRegulators(where: any, filter: string, filterArr: string, offset: number, limit: number, orderField: string, order: any, customerorgId: any, callback: any) {
//   console.log(filterArr, 'where model======================');

//   try {
//     const regulatorRepository = PostgresDataSource.getRepository(Regulators);

//    var ids='';

//     const list = await regulatorRepository
//       .createQueryBuilder('regulator')

//     if (customerorgId) {
//       const custObligationsRepository = PostgresDataSource.getRepository(custObligations);

//       const custOblilist: any = await custObligationsRepository
//         .createQueryBuilder('custObligations')
//         .leftJoinAndSelect('custObligations.customerOrganization', 'customer_organizations')
//         .leftJoinAndSelect('custObligations.regulator', 'regulator')
//         .where(`custObligations.customerOrganizationId = :customerorgId`, { customerorgId })
//         .select(['ARRAY_AGG(regulator.id) as regulator_id'])
//         .getRawOne()

//       if (custOblilist.regulator_id !== null) {
//         const regulatorIds = custOblilist.regulator_id

//         list.where(`regulator.id IN (:...regulatorIds)`, { regulatorIds })
//         var idRes = await regulatorRepository.createQueryBuilder('regulator')
//           .select(["array_to_string(ARRAY_AGG(regulator.id),',') as ids"])
//           .where(`regulator.id IN (:...regulatorIds)`, { regulatorIds })
//           .andWhere(filterArr ? filterArr : '1=1', { ...where })
//           .andWhere(filter ? filter : '1=1', { ...where })
//           .getRawOne();

//         console.log(idRes, 'idRes');
//         //array_to_string(ARRAY_AGG(id),',') as ids
//         ids = idRes.ids ? idRes.ids : '';

//       } else {

//         return callback("", [], 0, "");

//       }


//     } else {
//       var idRes = await regulatorRepository.createQueryBuilder('regulator')
//         .select(["array_to_string(ARRAY_AGG(regulator.id),',') as ids"])
//         .where(filterArr ? filterArr : '1=1', { ...where })
//         .andWhere(filter ? filter : '1=1', { ...where })
//         .getRawOne();

//       console.log(idRes, 'idRes');
//       //array_to_string(ARRAY_AGG(id),',') as ids
//       ids = idRes.ids ? idRes.ids : '';
//     }
//     list
//       .andWhere(filterArr ? filterArr : '1=1', { ...where })
//       .andWhere(filter ? filter : '1=1', { ...where })
//       .offset(offset)
//       .limit(limit)
//       .orderBy(orderField, order)

//     const [data, count] = await list.getManyAndCount()
//     return callback("", data, count, ids);

//   } catch (error) {
//     console.log("error....", error);
//     callback(error, '');

//   }


// }

// export async function RegulatorList(ids: any, userId: any, customerorgId: any, where: any, filter: string, filterArr: string, orderField: any, order: any, callback: any) {
//   const regulatorRepository = PostgresDataSource.getRepository(Regulators);


//   // if (regulatorIds && regulatorIds.length > 0) {
//   //   if (Object.keys(where).length > 0) {

//   //     if (filter !== "" && filterArr !== "") {
//   //       console.log("1");

//   //       const [list, count] = await regulatorRepository
//   //         .createQueryBuilder('regulator')
//   //         .where(`regulator.id IN(:...id)`, { id: regulatorIds })
//   //         .andWhere(filter,
//   //           {
//   //             regulatorShortName: where.regulatorShortName,
//   //             regulatorLongName: where.regulatorLongName,
//   //             regulatorDesc: where.regulatorDesc,
//   //             regulatorMainUrl: where.regulatorMainUrl,
//   //             regulatorUpdateSource: where.regulatorUpdateSource,
//   //             regulatorUpdateContact: where.regulatorUpdateContact,
//   //             country: where.country,
//   //             county: where.county,
//   //             updatedDate: where.updatedDate,
//   //             state: where.state,
//   //           })
//   //         .andWhere(filterArr, {
//   //           regulatorShortName: where.regulatorShortName,
//   //           regulatorLongName: where.regulatorLongName,
//   //           regulatorDesc: where.regulatorDesc,
//   //           regulatorMainUrl: where.regulatorMainUrl,
//   //           regulatorUpdateSource: where.regulatorUpdateSource,
//   //           regulatorUpdateContact: where.regulatorUpdateContact,
//   //           country: where.country,
//   //           county: where.county,
//   //           updatedDate: where.updatedDate,
//   //           state: where.state,

//   //         })
//   //         .getManyAndCount()

//   //       return callback("", list, count);

//   //     } else if (filter !== "") {
//   //       console.log("2");
//   //       const [list, count] = await regulatorRepository
//   //         .createQueryBuilder('regulator')
//   //         .where(`regulator.id IN(:...regulatorIds)`, { regulatorIds: regulatorIds })
//   //         .andWhere(filter,
//   //           {
//   //             regulatorShortName: where.regulatorShortName,
//   //             regulatorLongName: where.regulatorLongName,
//   //             regulatorDesc: where.regulatorDesc,
//   //             regulatorMainUrl: where.regulatorMainUrl,
//   //             regulatorUpdateSource: where.regulatorUpdateSource,
//   //             regulatorUpdateContact: where.regulatorUpdateContact,
//   //             country: where.country,
//   //             county: where.county,
//   //             updatedDate: where.updatedDate,
//   //             state: where.state,
//   //           })
//   //         .getManyAndCount()

//   //       return callback("", list, count);
//   //     } else {
//   //       console.log("3");
//   //       const [list, count] = await regulatorRepository
//   //         .createQueryBuilder('regulator')
//   //         .where(`regulator.id IN(:...id)`, { id: regulatorIds })
//   //         .andWhere(filterArr,
//   //           {
//   //             regulatorShortName: where.regulatorShortName,
//   //             regulatorLongName: where.regulatorLongName,
//   //             regulatorDesc: where.regulatorDesc,
//   //             regulatorMainUrl: where.regulatorMainUrl,
//   //             regulatorUpdateSource: where.regulatorUpdateSource,
//   //             regulatorUpdateContact: where.regulatorUpdateContact,
//   //             country: where.country,
//   //             county: where.county,
//   //             updatedDate: where.updatedDate,
//   //             state: where.state,
//   //           })
//   //         .getManyAndCount()

//   //       return callback("", list, count);
//   //     }
//   //   } else {
//   //     console.log("4");
//   //     const [list, count] = await regulatorRepository
//   //       .createQueryBuilder('regulator')
//   //       .where(`regulator.id IN(:...id)`, { id: regulatorIds })
//   //       .getManyAndCount()
//   //     return callback("", list, count);
//   //   }

//   // } else {
//   //   if (Object.keys(where).length > 0) {

//   //     if (filter !== "" && filterArr !== "") {
//   //       console.log("1");

//   //       const [list, count] = await regulatorRepository
//   //         .createQueryBuilder('regulator')
//   //         .andWhere(filter,
//   //           {
//   //             regulatorShortName: where.regulatorShortName,
//   //             regulatorLongName: where.regulatorLongName,
//   //             regulatorDesc: where.regulatorDesc,
//   //             regulatorMainUrl: where.regulatorMainUrl,
//   //             regulatorUpdateSource: where.regulatorUpdateSource,
//   //             regulatorUpdateContact: where.regulatorUpdateContact,
//   //             country: where.country,
//   //             county: where.county,
//   //             updatedDate: where.updatedDate,
//   //             state: where.state,
//   //           })
//   //         .andWhere(filterArr, {
//   //           regulatorShortName: where.regulatorShortName,
//   //           regulatorLongName: where.regulatorLongName,
//   //           regulatorDesc: where.regulatorDesc,
//   //           regulatorMainUrl: where.regulatorMainUrl,
//   //           regulatorUpdateSource: where.regulatorUpdateSource,
//   //           regulatorUpdateContact: where.regulatorUpdateContact,
//   //           country: where.country,
//   //           county: where.county,
//   //           updatedDate: where.updatedDate,
//   //           state: where.state,

//   //         })
//   //         .getManyAndCount()

//   //       return callback("", list, count);

//   //     } else if (filter !== "") {
//   //       console.log("2");
//   //       const [list, count] = await regulatorRepository
//   //         .createQueryBuilder('regulator')
//   //         .andWhere(filter,
//   //           {
//   //             regulatorShortName: where.regulatorShortName,
//   //             regulatorLongName: where.regulatorLongName,
//   //             regulatorDesc: where.regulatorDesc,
//   //             regulatorMainUrl: where.regulatorMainUrl,
//   //             regulatorUpdateSource: where.regulatorUpdateSource,
//   //             regulatorUpdateContact: where.regulatorUpdateContact,
//   //             country: where.country,
//   //             county: where.county,
//   //             updatedDate: where.updatedDate,
//   //             state: where.state,
//   //           })
//   //         .getManyAndCount()

//   //       return callback("", list, count);
//   //     } else {
//   //       console.log("3");
//   //       const [list, count] = await regulatorRepository
//   //         .createQueryBuilder('regulator')
//   //         .andWhere(filterArr,
//   //           {
//   //             regulatorShortName: where.regulatorShortName,
//   //             regulatorLongName: where.regulatorLongName,
//   //             regulatorDesc: where.regulatorDesc,
//   //             regulatorMainUrl: where.regulatorMainUrl,
//   //             regulatorUpdateSource: where.regulatorUpdateSource,
//   //             regulatorUpdateContact: where.regulatorUpdateContact,
//   //             country: where.country,
//   //             county: where.county,
//   //             updatedDate: where.updatedDate,
//   //             state: where.state,
//   //           })
//   //         .getManyAndCount()

//   //       return callback("", list, count);
//   //     }
//   //   } else {
//   //     console.log("4");
//   //     const [list, count] = await regulatorRepository
//   //       .createQueryBuilder('regulator')
//   //       .getManyAndCount()
//   //     return callback("", list, count);
//   //   }
//   // }

//   try {
//     const regulatorRepository = PostgresDataSource.getRepository(Regulators);

//     const list = await regulatorRepository
//       .createQueryBuilder('regulator')

//     if (customerorgId) {
//       const custObligationsRepository = PostgresDataSource.getRepository(custObligations);

//       const custOblilist: any = await custObligationsRepository
//         .createQueryBuilder('custobligations')
//         .leftJoinAndSelect('custobligations.customerOrganization', 'customer_organizations')
//         .leftJoinAndSelect('custobligations.regulator', 'regulator')
//         .andWhere(`custobligations.customerOrganizationId = :customerorgId`, { customerorgId })
//         // .andWhere(`custobligations.userId = :userId`, { userId })
//         .select(['ARRAY_AGG(regulator.id) as regulator_id'])
//         .getRawOne()

//       const regulatorIds = custOblilist.regulator_id

//       if(regulatorIds && regulatorIds.length > 0){
//         if (ids && ids.length > 0) {
//           const intersectionResult = regulatorIds.filter((x: any) => ids.includes(x))

//           if (intersectionResult && intersectionResult.length > 0) {
//             list
//               .andWhere(`regulator.id IN (:...regulatorIds)`, { regulatorIds: intersectionResult })

//           } else {
//             return callback("", [], 0);
//           }

//         } else{
//           list
//           .andWhere(`regulator.id IN (:...regulatorIds)`, { regulatorIds: regulatorIds })
//         }
//       }else{
//         return callback("", [], 0);
//       }


//     } else {
//       list.andWhere(ids && ids.length > 0 ? `regulator.id IN(:...id)` : '1=1', { id: ids })
//     }

//     list
//       .andWhere(filterArr ? filterArr : '1=1', { ...where })
//       .andWhere(filter ? filter : '1=1', { ...where })
//       .orderBy(orderField, order)
//     const [data, count] = await list.getManyAndCount()
//     return callback("", data, count);

//   } catch (error) {
//     console.log("error....", error);
//     callback(error, '');

//   }

// }


