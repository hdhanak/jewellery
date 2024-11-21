## Step For Start & Run Project
# Migration create 
npx typeorm migration:create ./src/api/migrations/CreateProductImage

# Migration Run 
npm run db:migrate
OR
npx typeorm-ts-node-commonjs migration:run -d src/config/db.ts 

# Seeders Run
npm run db:seed
OR 
npx ts-node ./src/api/seeder/main.seeder.ts
<!-- ## Migration Run - 2 (If above cmd not work) 
npx typeorm-ts-node-esm migration:run -d src/config/db.ts    -->

# install node modules
npm install --legacy-peer-deps

# Setup database settings in `db.ts` file

# Project Run CMD
npm run start:dev
