Migration create 
npx typeorm migration:create ./src/api/migrations/User

Migration Run
npx typeorm-ts-node-esm migration:run -d src/config/db.ts   

Project Run CMD
npm run start:dev