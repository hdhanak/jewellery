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
exports.User1718298381020 = void 0;
const typeorm_1 = require("typeorm");
class User1718298381020 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "auth_token",
                        type: "varchar",
                        default: null,
                        isNullable: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "is_deleted",
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
                    {
                        name: "deleted_date",
                        type: "timestamp",
                        isNullable: true
                    },
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.User1718298381020 = User1718298381020;
