import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Occasion1732098764581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "occasion",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "occasion",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "status",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "created_date",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
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
