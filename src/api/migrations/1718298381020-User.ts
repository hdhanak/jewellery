import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class User1718298381020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "first_name",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                },
                {
                    name: "last_name",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "auth_token",
                    type: "varchar",
                    default: null,
                    isNullable: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                },
                {
                    name: "status",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "is_deleted",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "created_date",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_date",
                    type: "timestamp",
                    isNullable: true,
                    onUpdate: "now()",
                },
                {
                    name: "deleted_date",
                    type: "timestamp",
                    isNullable: true
                },
            ],
        }), true);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
