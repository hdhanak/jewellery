// import { Users } from "../entities/users";
// import { Role } from "../entities/role";

// import { CustomerOrganization } from "../entities/customerOrganization";
// import { PostgresDataSource } from "../../config/db";
// import { sign } from "../../lib/jwt";
// import { logger } from "../../lib/logger";
// import { Permission } from "../entities/permission";
// import { RolesPermission } from "../entities/rolesPermission";
// import date from "date-and-time";
// import { Obligation } from "../entities/obligation";
// import { Disclosure_obligations_obligation } from "../entities/disclosure_obligations_obligation";


// export async function addRole(roleData: object, permissionData: object, callback: any) {
//   try {
//     const roles = JSON.parse(JSON.stringify(roleData));
//     const permissionsData = JSON.parse(JSON.stringify(permissionData));

//     await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Role, roles), callback).then(async (response) => {

//       const role = JSON.parse(JSON.stringify(response));
//       const roleRepository = PostgresDataSource.getRepository(Role);
//       const roleDetails = await roleRepository.findOneBy({ id: role.id });
//       console.log(roleDetails);
//       //  permissionsData.forEach(async (permission:any)=>{
//       for (var i = 0; i < permissionsData.length; i++) {
//         // @ts-ignore
//         var permission: any = permissionData[i];
//         const permissionRepository = PostgresDataSource.getRepository(Permission);
//         const permD = await permissionRepository.findOneBy({ id: permission.permissionId });
//         var obj: object = {
//           permission: permD,
//           roles: roleDetails,
//           readAccess: permission.access,
//           writeAccess: permission.modify,
//           createdDate: date.format(new Date(),
//             "YYYY-MM-DD HH:mm:ss")
//         };
//         console.log(obj);
//         await PostgresDataSource.manager.save(PostgresDataSource.manager.create(RolesPermission, obj), callback).then(async (rolePermission) => {
//           if (rolePermission) {
//             console.log("inserted");
//           } else {
//             callback("error");
//           }
//         }).catch((err) => {
//           callback(err, "");
//         });
//         //  })
//       }

//       callback("", roles);

//       // permissionsData.permission=permission;
//       // permissionsData.role=roleDetails;


//     }).catch((err) => {
//       // callback(err, '');
//       if (err.driverError !== undefined) {
//         if (err.driverError.detail === "Key (name)=(User Role 124) already exists.")
//           callback("Role name is already exist", "");
//         else
//           callback(err.driverError.detail, "");

//       } else {
//         callback(err, "");
//       }
//     });

//   } catch (error: any) {
//     logger.error(error);
//     callback(error, "");

//     //  throw new Error(error);
//   }
// }

// export async function updateRole(roleData: object, permissionData: object, roleId: any, callback: any) {
//   try {
//     const roles = JSON.parse(JSON.stringify(roleData));
//     const permissionsData = JSON.parse(JSON.stringify(permissionData));

//     const rolePermissionRepository = PostgresDataSource.getRepository(RolesPermission);

//     PostgresDataSource.manager.update(Role, roleId, roles).then(async (response) => {

//       console.log(response);
//       for (var i = 0; i < permissionsData.length; i++) {
//         // @ts-ignore
//         var permission: any = permissionData[i];
//         // var obj: object = {
//         //   readAccess: permission.access,
//         //   writeAccess: permission.modify,
//         //   updatedDate: date.format(new Date(),
//         //     "YYYY-MM-DD HH:mm:ss")
//         // };

//         var obj: object = {
//           permission: permission.permissionId,
//           roles: roleId,
//           readAccess: permission.access,
//           writeAccess: permission.modify,
//           updatedDate: date.format(new Date(),
//             "YYYY-MM-DD HH:mm:ss")
//         };

//         rolePermissionRepository.upsert([
//             obj
//           ],
//           ["permission", "roles"]
//         ).then(async (updateResults) => {
//           true;

//           // console.log(updateResults);


//           if (updateResults) {
//             console.log("updated", updateResults);
//           } else {
//             callback("error");
//           }
//         }).catch((err) => {
//           // console.log(err);
//           callback(err, "");
//         });

//         // await PostgresDataSource
//         //   .createQueryBuilder()
//         //   .update(RolesPermission)
//         //   .set(obj)
//         //   .where({
//         //     permission: permission.permissionId,
//         //     roles: roleId
//         //   })
//         //   .execute().then(async (updateResults) => {
//         //     true;
//         //
//         //     console.log(updateResults);
//         //
//         //
//         //     if (updateResults) {
//         //       console.log("updated", updateResults);
//         //     } else {
//         //       callback("error");
//         //     }
//         //   }).catch((err) => {
//         //     console.log(err);
//         //     callback(err, "");
//         //   });
//       }

//       callback("", response);

//     }).catch((err) => {
//       console.log(err);
//       callback(err, "");
//     });

//   } catch (error: any) {
//     logger.error(error);
//     throw new Error(error);
//   }
// }

// export async function deleteRole(roleId: any, callback: any) {
//   try {
//     if (roleId === "1") {
//       callback("This is Administrator Role. You will not delete this role, Please try to delete other role.", "");
//     } else {
//       await PostgresDataSource
//         .createQueryBuilder()
//         .delete()
//         .from(Role)
//         .where("id = :id", { id: roleId })
//         .execute().then((deleteRes) => {
//           console.log(deleteRes);
//           if (deleteRes.affected)
//             callback("", deleteRes);
//           else
//             callback("Invalid Role Id", "");
//         }).catch(error => {
//           if (error.driverError !== undefined && error.driverError.detail !== undefined) {
//             var table = `${error.driverError.table}`.charAt(0).toUpperCase() + `${error.driverError.table}`.slice(1);
//             // if (table == "Disclosure_obligations_obligation") {
//             //     return callback(`Please unlink this record from Link-table`, '');
//             // }
//             return callback(`Please unlink this role from ${table}`, "");

//           } else callback(error, "");
//         });
//     }
//   } catch (error: any) {
//     callback("error", error);
//   }
// }

// export async function FindAllRoles(where: any, offset: number, limit: number, orderField: string, order: any, callback: any) {
//   const roleRepository = PostgresDataSource.getRepository(Role);

//   const [list, count] = await PostgresDataSource
//     .getRepository(Role)
//     .createQueryBuilder("roles")
//     .leftJoinAndSelect("roles.rolesPermission", "permission")
//     .leftJoinAndSelect("permission.permission", "permissiondetails")
//     .leftJoinAndSelect("permission.roles", "roledetails")
//     .orderBy(orderField, order)
//     .getManyAndCount();


//   callback("", list, count);
// }
