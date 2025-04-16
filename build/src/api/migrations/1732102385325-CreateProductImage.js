"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductImage1732102385325 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductImage1732102385325 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            yield queryRunner.createForeignKey("product_image", new typeorm_1.TableForeignKey({
                columnNames: ["product_id"],
                referencedTableName: "product",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CreateProductImage1732102385325 = CreateProductImage1732102385325;
