import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProduct1732099207817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "product_code",
                    type: "varchar",
                },
                {
                    name: "product_name",
                    type: "varchar",
                },
                {
                    name: "product_title",
                    type: "varchar",
                },
                {
                    name: "product_detail",
                    type: "varchar",
                },
                {
                    name: "product_sub_detail",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "product_image",
                    type: "varchar",
                },
                {
                    name: "product_category_id",
                    type: "int",
                },
                {
                    name: "product_type",
                    type: "bigint",
                    isNullable: true,
                },
                {
                    name: "occasion",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "metal_id",
                    type: "int",
                },
                {
                    name: "gold_purity",
                    type: "integer",
                    isNullable: true,
                },
                {
                    name: "gross_weight",
                    type: "numeric(10,2)",
                    isNullable: true,
                },
                {
                    name: "gender",
                    type: "integer",
                    default: 1,
                },
                {
                    name: "height",
                    type: "numeric(10,2)",
                    isNullable: true,
                },
                {
                    name: "width",
                    type: "numeric(10,2)",
                    isNullable: true,
                },
                {
                    name: "size",
                    type: "numeric(10,2)",
                    isNullable: true,
                },
                {
                    name: "diamond_clarity",
                    type: "numeric(10,2)",
                    isNullable: true,
                },
                {
                    name: "diamond_color",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "diamond_weight",
                    type: "numeric(10,2)",
                    isNullable: true,
                },
                {
                    name: "no_of_diamonds",
                    type: "bigint",
                    isNullable: true,
                },
                {
                    name: "extra_add_price",
                    type: "numeric(10,2)",
                    isNullable: true,
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
            uniques: [
                {
                    name: "UQ_metal_id_product_code", // Unique constraint name
                    columnNames: ["metal_id", "product_code"],
                },
            ],
        }), true);

        // Add foreign key constraint to 'product_category_id' column referencing 'product_category(id)'
        await queryRunner.createForeignKey("product", new TableForeignKey({
            columnNames: ["product_category_id"],
            referencedTableName: "product_category",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("product", new TableForeignKey({
            columnNames: ["metal_id"],
            referencedTableName: "metal",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",

        }));

        // Create the join table for Many-to-Many relation with Occasion
        await queryRunner.createTable(new Table({
            name: "product_occasion",
            columns: [
                {
                    name: "occasion_id",
                    type: "int",
                },
                {
                    name: "product_id",
                    type: "int",
                },
            ],
        }));

        // Add foreign keys for the Many-to-Many relationship
        await queryRunner.createForeignKey("product_occasion", new TableForeignKey({
            columnNames: ["product_id"],
            referencedTableName: "product",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("product_occasion", new TableForeignKey({
            columnNames: ["occasion_id"],
            referencedTableName: "occasion", // Assuming you have an Occasion table
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
