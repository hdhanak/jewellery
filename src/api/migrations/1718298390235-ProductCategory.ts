import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductCategory1718298390235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product_category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "product_category_code",
                    type: "varchar",
                    unsigned:true
                },
                {
                    name: "product_category_name",
                    type: "varchar",
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
                    default: null,
                },
            ],
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
