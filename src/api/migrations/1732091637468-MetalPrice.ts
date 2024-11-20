import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class MetalPrice1732091637468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "metal_daily_price",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "metal_id",
                    type: "int",
                },
                {
                    name: "metal_price_date",
                    type: "date",
                    default: "CURRENT_DATE", // Default to the current date
                    comment: "The date when the metal price was recorded.",
                },
                {
                    name: "metal_price",
                    type: "numeric",
                    precision: 15,
                    scale: 4,
                    comment: "The price of the metal with up to 4 decimal places.",
                },
                {
                    name: "metal_gram",
                    type: "numeric",
                    precision: 10,
                    scale: 2,
                    default: 1,
                    comment: "The price of gram of the metal.",
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
            uniques: [
                {
                    name: "UQ_metal_id_metal_price_date", // Unique constraint name
                    columnNames: ["metal_id", "metal_price_date"],
                },
            ],
        }), true);

        await queryRunner.createForeignKey("metal_daily_price", new TableForeignKey({
            columnNames: ["metal_id"],
            referencedTableName: "metal",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
