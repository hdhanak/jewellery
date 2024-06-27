// import mongoose from 'mongoose'
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { env } from "../env";
import { Users } from "../api/entity/user.entity";
import { Role } from "../api/entity/role.entity";
import { Product } from "../api/entity/product.entity";
import { ProductCategory } from "../api/entity/product_category.entity";
import path from "path";
import * as fs from "fs";
// Helper function to load entity classes dynamically
const loadEntities = (directory: string) => {
  const entityFiles = fs
    .readdirSync(directory)
    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
    .map(file => path.join(directory, file));

  return entityFiles.map(file => {
    const entityModule = require(file);
    return entityModule.default || Object.values(entityModule)[0];
  }).filter(entity => entity !== undefined);
};

// Define paths to entities and migrations
const entitiesPath = path.join(__dirname, "../api/entity");
const migrationsPath = path.join(__dirname, "../api/migrations");

// Load entities and migrations dynamically
const entities = loadEntities(entitiesPath);
const migrations = [
  ...fs.readdirSync(migrationsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js")).map(file => path.join(migrationsPath, file)),
];

console.log("Entities:", entities);
console.log("Migrations:", migrations);


console.log(path.join(__dirname, '../**/**.entity{.ts,.js}')), "---7777-------";
const enittyPath = "C:\Users\Dell\Documents\My Projects\JEWELLERY BACKEND\src\api\*.entity{.ts,.js}"
const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: env.DB_HOST,
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  ssl: true,
  // synchronize: true,
  entities: entities,
  logging: true,
  migrations: migrations,
  migrationsTableName: "custom_migration_table",



  //seeds: ['src/seeding/seeds/{*.ts,*.js}'],
  // factories: ['src/seeding/factories/{*.ts,*.js}']
  // seeds: ['RegulationSeed'],
  //factories: ['src/seeding/factories/{*.ts,*.js}']
  //logging: ["query"]
};

export const PostgresDataSource = new DataSource(options);
PostgresDataSource.initialize()
  .then(async () => {
    console.log("Connected to postgres");
  })
  .catch((error) => console.log(error));

