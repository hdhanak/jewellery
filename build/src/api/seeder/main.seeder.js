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
require("reflect-metadata");
const db_1 = require("../../config/db");
const metal_entity_1 = require("../entity/metal.entity");
const occasion_entity_1 = require("../entity/occasion.entity");
const product_category_entity_1 = require("../entity/product_category.entity");
function runSeeder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Seeder started");
            yield db_1.PostgresDataSource.initialize();
            console.log("Data Source initialized");
            const occasions = [
                { name: "Wedding" },
                { name: "Work" },
                { name: "Casual" },
                { name: "Formal" },
                { name: "Anniversary" }
            ];
            const occasionRepository = db_1.PostgresDataSource.getRepository(occasion_entity_1.Occasion);
            const occasionEntities = occasions.map(occasionData => {
                const occasion = new occasion_entity_1.Occasion();
                occasion.occasion = occasionData.name;
                return occasion;
            });
            yield occasionRepository.save(occasionEntities);
            const metals = [
                { name: "Silver" },
                { name: "Gold" },
                { name: "Platinum" },
            ];
            const metalRepository = db_1.PostgresDataSource.getRepository(metal_entity_1.Metal);
            for (const metalData of metals) {
                const metal = new metal_entity_1.Metal();
                metal.metal_name = metalData.name;
                yield metalRepository.save(metal);
            }
            const productCategories = [
                {
                    product_category_name: "BANGLES",
                    product_category_code: "BANG"
                },
                {
                    product_category_name: "BRACELETS",
                    product_category_code: "BRACELET"
                },
                {
                    product_category_name: "EARRINGS",
                    product_category_code: "EARR"
                },
                {
                    product_category_name: "GOLD CHAINS",
                    product_category_code: "GOLDCHAIN"
                },
                {
                    product_category_name: "PENDANTS",
                    product_category_code: "PEND"
                },
                {
                    product_category_name: "RINGS",
                    product_category_code: "RING"
                },
                {
                    product_category_name: "ENGAGEMENT RINGS",
                    product_category_code: "ENGRING"
                },
                {
                    product_category_name: "NECKLACES",
                    product_category_code: "NECK"
                },
                {
                    product_category_name: "NOSE PINS",
                    product_category_code: "NOSEPIN"
                },
                {
                    product_category_name: "KADAS",
                    product_category_code: "KADA"
                },
                {
                    product_category_name: "MANGALSUTRAS",
                    product_category_code: "MANGAL"
                },
                {
                    product_category_name: "JHUMKAS",
                    product_category_code: "JHUMKA"
                },
                {
                    product_category_name: "HOOP EARRINGS",
                    product_category_code: "HOOP"
                },
                {
                    product_category_name: "STUD EARRINGS",
                    product_category_code: "STUD"
                },
                {
                    product_category_name: "DROP EARRINGS",
                    product_category_code: "DROP"
                },
                {
                    product_category_name: "MAANG TIKKA",
                    product_category_code: "TIKKA"
                },
                {
                    product_category_name: "NECKLACE SET",
                    product_category_code: "NECKSET"
                },
                {
                    product_category_name: "PENDANTS & EARRINGS SETS",
                    product_category_code: "PENDSET"
                },
                {
                    product_category_name: "GOLD COINS",
                    product_category_code: "COIN"
                }
            ];
            const formattedAllCategories = productCategories.map(category => {
                const productCategory = new product_category_entity_1.ProductCategory();
                productCategory.product_category_code = category.product_category_code;
                productCategory.product_category_name = category.product_category_name;
                return productCategory;
            });
            const productCategoryRepository = db_1.PostgresDataSource.getRepository(product_category_entity_1.ProductCategory);
            yield productCategoryRepository.insert(formattedAllCategories);
            console.log("Product categories inserted successfully!");
            console.log("Seeding completed successfully");
        }
        catch (error) {
            console.error("Error during the seeding process:", error);
        }
        finally {
            // Close the database connection
            yield db_1.PostgresDataSource.destroy();
        }
    });
}
runSeeder();
