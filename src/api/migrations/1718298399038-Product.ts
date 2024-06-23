import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Product1718298399038 implements MigrationInterface {

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
                    name: "metal",
                    type: "integer",
                    default: 0,
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

        // Add foreign key constraint to 'product_category_id' column referencing 'product_category(id)'
        await queryRunner.createForeignKey("product", new TableForeignKey({
            columnNames: ["product_category_id"],
            referencedTableName: "product_category",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
