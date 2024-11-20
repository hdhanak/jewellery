## Migration create 
npx typeorm migration:create ./src/api/migrations/CreateProductImage

## Migration Run 
npx typeorm-ts-node-commonjs migration:run -d src/config/db.ts 
OR
npm run db:migrate

## Seeders Run
npx ts-node --project tsconfig.json ./node_modules/typeorm-seeding/dist/cli.js -n src/config/db.ts seed

<!-- ## Migration Run - 2 (If above cmd not work) 
npx typeorm-ts-node-esm migration:run -d src/config/db.ts    -->

## install node modules
npm install --legacy-peer-deps

## Setup database settings in `db.ts` file

## Project Run CMD
npm run start:dev
