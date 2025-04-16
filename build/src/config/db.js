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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const env_1 = require("../env");
console.log(env_1.env.LOCAL_DB_URL, "env.LOCAL_DB_URL");
const options = {
    type: "postgres",
    url: env_1.env.LOCAL_DB_URL,
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "root",
    // database: "jewellery_shop_db_dev",
    ssl: true,
    logging: true,
    entities: [path_1.default.join(__dirname, "../api/entity/*.{ts,js}")],
    // entities: [Metal],
    seeds: [path_1.default.join(__dirname, "../api/seeding/*.{ts,js}")],
    migrationsTableName: "custom_migration_table",
    migrations: [path_1.default.join(__dirname, "../api/migrations/*.{ts,js}")],
};
exports.PostgresDataSource = new typeorm_1.DataSource(options);
exports.PostgresDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to postgres");
}))
    .catch((error) => {
    console.log("Error during DataSource initialization:", error);
});
