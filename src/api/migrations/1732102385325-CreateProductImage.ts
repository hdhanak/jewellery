import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductImage1732102385325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product_image",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "image",
                    type: "varchar",
                },
                {
                    name: "product_id",
                    type: "int",
                },
                {
                    name: "status",
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

            ],
        }), true);

        // Add foreign key constraint between 'product_image' and 'product'
        await queryRunner.createForeignKey("product_image", new TableForeignKey({
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