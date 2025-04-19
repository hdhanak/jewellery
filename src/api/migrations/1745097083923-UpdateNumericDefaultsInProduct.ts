import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNumericDefaultsInProduct1745097083923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "gross_weight" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "height" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "width" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "size" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diamond_clarity" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diamond_weight" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "extra_add_price" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diamond_price_per_item" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "gross_weight" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "height" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "width" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "size" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diamond_clarity" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diamond_weight" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "extra_add_price" SET DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diamond_price_per_item" SET DEFAULT NULL`);
    }

}
