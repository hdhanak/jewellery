import { PostgresDataSource } from "../../config/db";
import { logger } from "../../lib/logger";
import bcrypt from "bcrypt";
import { Users } from "../entity/user.entity";
import { sign } from "../lib/jwt";
import { Constants } from "../../config/constants";

export async function addUser(whereClause: object, userData: Partial<Users>): Promise<object> {
    try {
        if (!whereClause || !userData) {
            throw new Error("Invalid parameters. Both whereClause and userData must be provided.");
        }

        const where = JSON.parse(JSON.stringify(whereClause));
        const data = userData

        data.password = data.password;
        console.log(data, 'data');

        const savedUserData = await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Users, data));

        return savedUserData;
    } catch (error: any) {
        logger.error(`Error adding user: ${error.message}`);
        throw error;
    }
}

export async function LoginUser(where: object, password: string) {
    try {
        const userRepository = PostgresDataSource.getRepository(Users);
        const user = await userRepository.findOne({
            where, relations: {
                // customerorg: true,
                role: true
            }
        });


        if (user) {

            const res = JSON.parse(JSON.stringify(user));
            var userdata = {
                email: res.email,
                user_id: res.id,
            };
            console.log(password);
            console.log(res.password);
            const validPassword = await bcrypt.compare(password, res.password);
            if (validPassword) {
                const token = sign(userdata);
                console.log(token);
                user.auth_token = token;
                return user

            } else {
                console.log(validPassword, "validPassword");
                return Constants.USERS.INVALID_EMAIL_OR_PASSWORD
            }
        } else {
            return "Invalid Email or Password!"
        }
    } catch (error) {
        return error
    }
}

export async function ChangePassword(email: string, newPassword: string, callback: any) {

    var nPassword = await bcrypt.hash(newPassword, 10);
    PostgresDataSource.manager.update(Users, { email: email }, { password: nPassword }).then((response) => {
        if (response.affected) {
            callback("", response);
        } else {
            callback("Invalid Email Address", "");
        }
    }).catch((error) => {
        callback(error, "");
    });

}

export async function EmailCheck(email: string, callback: any) {
    const userRepository = PostgresDataSource.getRepository(Users);
    userRepository.findOne({ where: { email: email } }).then((response) => {
        if (response) {
            callback("", response);
        } else {
            callback("Invalid Email Address", "");
        }
    }).catch((error) => {
        callback(error, "");
    });

}


export async function FindAllUsers(where: any, filter: any, offset: number, limit: number, orderField: string, order: any, callback: any) {
    const userRepository = PostgresDataSource.getRepository(Users);


    if (Object.keys(where).length > 0) {
        if (filter !== "") {
            console.log("2");
            const [list, count] = await userRepository
                .createQueryBuilder("users")
                .leftJoinAndSelect("users.role", "roles")
                .leftJoinAndSelect("users.customerorg", "customerOrganization")
                .leftJoinAndSelect("users.organizationAccess", "organizationAccess")
                .leftJoinAndSelect("organizationAccess.custOrg", "custOrg")
                .where(filter,
                    {
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
    } else {

        const [list1, count1] = await userRepository
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
}
