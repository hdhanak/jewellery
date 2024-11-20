import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductOccasion1732099306691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product_occasion",
            columns: [
                {
                    name: "occasion_id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "product_id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "status",
                    type: "boolean",
                    default: false,
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
                },
            ],
        }), true);
        await queryRunner.createForeignKey("product_occasion", new TableForeignKey({
            columnNames: ["occasion_id"],
            referencedTableName: "occasion",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",

        }));
        await queryRunner.createForeignKey("product_occasion", new TableForeignKey({
            columnNames: ["product_id"],
            referencedTableName: "product",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
