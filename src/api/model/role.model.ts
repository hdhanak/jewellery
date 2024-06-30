import { PostgresDataSource } from "../../config/db";
import { Role } from "../entity/role.entity";
import date from "date-and-time";
import { logger } from "../lib/logger";
import { Constants } from "../../config/constants";

export async function addRole(whereClause: object, userData: Partial<Role>): Promise<object> {
    try {
        if (!whereClause || !userData) {
            throw new Error("Invalid parameters. Both whereClause and userData must be provided.");
        }

        const where = JSON.parse(JSON.stringify(whereClause));
        const data = userData


        const savedUserData = await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Role, data));

        return savedUserData;
    } catch (error: any) {
        logger.error(`Error adding user: ${error.message}`);
        throw error;
    }
}

export async function updateRole(where: any, roleData: object) {
    try {
        const roles = JSON.parse(JSON.stringify(roleData));
        const updateResult = await PostgresDataSource
            .createQueryBuilder()
            .update(Role)
            .set(roleData)
            .where(where)
            .returning("*")
            .updateEntity(true)
            .execute();

        if (updateResult.affected === 0) {
            // throw new Error(Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
            return new Error(Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
        }

        const updatedData = updateResult.raw[0];
        return updatedData;

    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }
}

export async function deleteRole(roleId: any, callback: any) {
    try {
        if (roleId === "1") {
            callback("This is Administrator Role. You will not delete this role, Please try to delete other role.", "");
        } else {
            await PostgresDataSource
                .createQueryBuilder()
                .delete()
                .from(Role)
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

                    } else callback(error, "");
                });
        }
    } catch (error: any) {
        callback("error", error);
    }
}

export async function FindAllRoles(where: any, offset: number, limit: number, orderField: string, order: any, callback: any) {
    const roleRepository = PostgresDataSource.getRepository(Role);

    const [list, count] = await PostgresDataSource
        .getRepository(Role)
        .createQueryBuilder("roles")
        .leftJoinAndSelect("roles.rolesPermission", "permission")
        .leftJoinAndSelect("permission.permission", "permissiondetails")
        .leftJoinAndSelect("permission.roles", "roledetails")
        .orderBy(orderField, order)
        .getManyAndCount();


    callback("", list, count);
}
