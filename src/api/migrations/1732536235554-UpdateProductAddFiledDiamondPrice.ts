import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class UpdateProductAddFieldDiamondPrice1732536235554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("product", new TableColumn({
            name: "diamond_price_per_item",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product", "diamond_price_per_item");  // Use the same name as in 'up' method
    }
}
