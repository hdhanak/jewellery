import "reflect-metadata";
import { PostgresDataSource } from "../../config/db";
import { Metal } from "../entity/metal.entity";
import { Occasion } from "../entity/occasion.entity";
import { v4 as uuidv4 } from 'uuid'; // For generating unique alphanumeric strings
import { ProductCategory } from "../entity/product_category.entity";

async function runSeeder() {
    try {
        console.log("Seeder started");

        await PostgresDataSource.initialize()
        console.log("Data Source initialized");

        const occasions = [
            { name: "Wedding" },
            { name: "Work" },
            { name: "Casual" },
            { name: "Formal" },
            { name: "Anniversary" }
        ];
        const occasionRepository = PostgresDataSource.getRepository(Occasion);
        const occasionEntities = occasions.map(occasionData => {
            const occasion = new Occasion();
            occasion.occasion = occasionData.name;
            return occasion;
        });
        await occasionRepository.save(occasionEntities);

        const metals = [
            { name: "Silver" },
            { name: "Gold" },
            { name: "Platinum" },
        ];
        const metalRepository = PostgresDataSource.getRepository(Metal);

        for (const metalData of metals) {
            const metal = new Metal();
            metal.metal_name = metalData.name;
            await metalRepository.save(metal);
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
            const productCategory = new ProductCategory();
            productCategory.product_category_code = category.product_category_code;
            productCategory.product_category_name = category.product_category_name;
            return productCategory;
        });
        const productCategoryRepository = PostgresDataSource.getRepository(ProductCategory);

        await productCategoryRepository.insert(formattedAllCategories);
        console.log("Product categories inserted successfully!");

        console.log("Seeding completed successfully");

    } catch (error) {
        console.error("Error during the seeding process:", error);
    } finally {
        // Close the database connection
        await PostgresDataSource.destroy();
    }
}

runSeeder();
