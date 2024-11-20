import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import path from "path";
// import { PgDriver } from "pg";  // Explicitly import the PgDriver (pg module)

// Define the options for the PostgreSQL connection and seeding configuration
const options: DataSourceOptions & SeederOptions = {
  type: "postgres",  // Should be correctly set to "postgres"
  // driver: PgDriver,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "jewellery_shop_db_dev",
  ssl: false,
  logging: true,
  entities: [path.join(__dirname, "../api/entity/*.{ts,js}")],
  seeds: [path.join(__dirname, "../api/seeding/*.{ts,js}")],
  migrationsTableName: "custom_migration_table",
  migrations: [path.join(__dirname, "../api/migrations/*.{ts,js}")],
};

// Create a new DataSource instance
export const PostgresDataSource = new DataSource(options);

// Initialize the connection and log the result
PostgresDataSource.initialize()
  .then(() => {
    console.log("Connected to postgres");
  })
  .catch((error) => {
    console.log("Error during DataSource initialization:", error);
  });
