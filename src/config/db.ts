// import mongoose from 'mongoose'
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { env } from "../env";
import { Users } from "../api/entity/user.entity";
import { Role } from "../api/entity/role.entity";
import { Product } from "../api/entity/product.entity";
import { ProductCategory } from "../api/entity/product_category.entity";
const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: env.DB_HOST,
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [Users, Role, Product, ProductCategory],

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

