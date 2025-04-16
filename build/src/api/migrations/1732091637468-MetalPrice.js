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
exports.MetalPrice1732091637468 = void 0;
const typeorm_1 = require("typeorm");
class MetalPrice1732091637468 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            yield queryRunner.createForeignKey("metal_daily_price", new typeorm_1.TableForeignKey({
                columnNames: ["metal_id"],
                referencedTableName: "metal",
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
exports.MetalPrice1732091637468 = MetalPrice1732091637468;
