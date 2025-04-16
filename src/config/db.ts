import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import path from "path";
import { env } from "../env";
import { Metal } from "../api/entity/metal.entity";
console.log(env.LOCAL_DB_URL, "env.LOCAL_DB_URL");

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  url: env.LOCAL_DB_URL,
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "root",
  // database: "jewellery_shop_db_dev",
  ssl: true,
  logging: true,
  entities: [path.join(__dirname, "../api/entity/*.{ts,js}")],
  // entities: [Metal],
  seeds: [path.join(__dirname, "../api/seeding/*.{ts,js}")],
  migrationsTableName: "custom_migration_table",
  migrations: [path.join(__dirname, "../api/migrations/*.{ts,js}")],
};

export const PostgresDataSource = new DataSource(options);
PostgresDataSource.initialize()
  .then(async () => {
    console.log("Connected to postgres");
  })
  .catch((error) => {
    console.log("Error during DataSource initialization:", error);
  });
