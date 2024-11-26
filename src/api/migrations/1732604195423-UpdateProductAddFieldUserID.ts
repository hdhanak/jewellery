import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class UpdateProductAddFieldUserID1732604195423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("product", new TableColumn({
            name: "user_id",
            type: "integer",
            isNullable: true,
        }));
        await queryRunner.createForeignKey("product", new TableForeignKey({
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product", "user_id");

    }

}
