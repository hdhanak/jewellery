import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Metal1732091422096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "metal",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "metal_name",
                    type: "varchar(200)",
                    isUnique: true
                },
                {
                    name: "status",
                    type: "boolean",
                    default: true,
                    comment: "Indicates whether the metal is actively used worldwide.",
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
            ],
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
