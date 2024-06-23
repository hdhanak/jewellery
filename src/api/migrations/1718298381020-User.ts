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
                    name: "user_code",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "first_name",
                    type: "varchar",
                },
                {
                    name: "last_name",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "phone",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "auth_token",
                    type: "varchar",
                    default: null,
                    isNullable: true,
                },
                {
                    name: "status",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "role_id",
                    type: "int",
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
                },
                {
                    name: "deleted_date",
                    type: "timestamp",
                    isNullable: true,
                },
            ],
        }), true);

        // Add foreign key constraint to 'role_id' column referencing 'roles(id)'
        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
