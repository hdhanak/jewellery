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
exports.findAllProducts = exports.findProduct = exports.deleteProduct = exports.updateProduct = exports.addProduct = void 0;
const constants_1 = require("../../config/constants");
const db_1 = require("../../config/db");
const logger_1 = require("../../lib/logger");
const product_entity_1 = require("../entity/product.entity");
const product_images_entity_1 = require("../entity/product_images.entity");
const product_occasion_entity_1 = require("../entity/product_occasion.entity");
function addProduct(whereClause, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdProduct = yield db_1.PostgresDataSource.manager.save(db_1.PostgresDataSource.manager.create(product_entity_1.Product, productData));
            if (productData && productData.product_images && productData.product_images.length != 0) {
                const productImageEntities = productData.product_images.map((imageUrl) => {
                    if (imageUrl) {
                        return db_1.PostgresDataSource.manager.create(product_images_entity_1.ProductImage, {
                            product: createdProduct,
                            image: imageUrl
                        });
                    }
                });
                yield db_1.PostgresDataSource.manager.save(product_images_entity_1.ProductImage, productImageEntities);
            }
            if (productData && productData.occasion && productData.occasion != null) {
                console.log(productData.occasion.split(','), "split");
                const productOccasionEntities = productData.occasion.split(',').map((occasion) => {
                    if (occasion) {
                        return db_1.PostgresDataSource.manager.create(product_occasion_entity_1.ProductOccasion, {
                            product_id: createdProduct.id,
                            occasion_id: occasion
                        });
                    }
                });
                yield db_1.PostgresDataSource.manager.save(product_occasion_entity_1.ProductOccasion, productOccasionEntities);
            }
            const productAllDetails = yield db_1.PostgresDataSource.getRepository(product_entity_1.Product).findOne({
                where: { id: createdProduct.id },
                relations: ["product_images"],
            });
            if (!productAllDetails) {
                throw new Error(`Product with ID ${createdProduct.id} not found.`);
            }
            return productAllDetails;
        }
        catch (error) {
            logger_1.logger.error(`Error adding product: ${error.message}`);
            if (error === null || error === void 0 ? void 0 : error.message.includes(`"UQ_metal_id_product_code"`)) {
                throw new Error(`A product with this code already exists for the selected metal. Please try using a unique product code or choose a different metal (e.g., Gold, Silver, or Platinum).`);
            }
            else {
                throw new Error(`Unexpected error occurred: ${error.message}`);
            }
        }
    });
}
exports.addProduct = addProduct;
function updateProduct(whereClause, updateData, relationEntityPayloadRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const where = JSON.parse(JSON.stringify(whereClause));
            console.log(updateData, "updateData");
            // Update the product information
            const updateResult = yield db_1.PostgresDataSource
                .createQueryBuilder()
                .update(product_entity_1.Product)
                .set(updateData)
                .where(where)
                .returning("*")
                .updateEntity(true)
                .execute();
            // .catch((err) => console.log(err))
            console.log("0000");
            // Check if any rows were affected
            if (updateResult.affected === 0) {
                // throw new Error(Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
                return new Error(constants_1.Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
            }
            const updatedProduct = updateResult.raw[0];
            console.log("111");
            // Handle product images
            if (relationEntityPayloadRequest && relationEntityPayloadRequest.product_images && relationEntityPayloadRequest.product_images.length !== 0) {
                // First, remove existing images
                console.log("1212");
                yield db_1.PostgresDataSource.manager.delete(product_images_entity_1.ProductImage, { product: updatedProduct.id });
                // Then, add new images
                const productImageEntities = relationEntityPayloadRequest.product_images.map((imageUrl) => {
                    if (imageUrl) {
                        return db_1.PostgresDataSource.manager.create(product_images_entity_1.ProductImage, {
                            product: updatedProduct,
                            image: imageUrl
                        });
                    }
                });
                yield db_1.PostgresDataSource.manager.save(product_images_entity_1.ProductImage, productImageEntities);
            }
            console.log("222");
            // Handle occasion data
            if (relationEntityPayloadRequest && relationEntityPayloadRequest.occasion && relationEntityPayloadRequest.occasion != null) {
                // First, remove existing occasions
                console.log("12***12");
                yield db_1.PostgresDataSource.manager.delete(product_occasion_entity_1.ProductOccasion, { product_id: updatedProduct.id });
                // Then, add new occasions
                const productOccasionEntities = relationEntityPayloadRequest.occasion.split(',').map((occasion) => {
                    if (occasion) {
                        return db_1.PostgresDataSource.manager.create(product_occasion_entity_1.ProductOccasion, {
                            product_id: updatedProduct.id,
                            occasion_id: occasion
                        });
                    }
                });
                yield db_1.PostgresDataSource.manager.save(product_occasion_entity_1.ProductOccasion, productOccasionEntities);
            }
            console.log("3333");
            // Return the updated product
            return updatedProduct;
        }
        catch (error) {
            logger_1.logger.error(`Error updating product: ${error.message}`);
            if (error === null || error === void 0 ? void 0 : error.message.includes(`"UQ_metal_id_product_code"`)) {
                throw new Error(`A product with this code already exists for the selected metal. Please try using a unique product code or choose a different metal (e.g., Gold, Silver, or Platinum).`);
            }
            else {
                throw new Error(`Unexpected error occurred: ${error.message}`);
            }
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteResult = yield db_1.PostgresDataSource
                .createQueryBuilder()
                .delete()
                .from(product_entity_1.Product)
                .where(`id IN (:...ids)`, { ids: ids })
                .execute();
            // Check if any rows were affected
            if (deleteResult.affected === 0) {
                throw new Error(constants_1.Constants.PRODUCTS.NO_PRODUCTS_FOUND_TO_DELETE);
            }
            // Return the delete result
            return deleteResult.raw;
        }
        catch (error) {
            logger_1.logger.error(`Error deleting product(s): ${error.message}`);
            throw error;
        }
    });
}
exports.deleteProduct = deleteProduct;
function findProduct(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rawQuery = `
            SELECT 
            p.*, 
            pc.product_category_code AS product_category_code, 
            pc.product_category_name AS product_category_name, 
            m.metal_name,
            ARRAY_AGG(DISTINCT o.occasion) AS occasions, 
            ARRAY_AGG(DISTINCT (JSONB_BUILD_OBJECT('image', pi.image, 'id', pi.id)::TEXT)) AS product_images,
            mdp.latest_price AS latest_metal_price,
            max(mdp.latest_date) AS latest_metal_date,
            ROUND(((mdp.latest_price * CEIL((p.gold_purity::numeric*100)/24))/100 * p.gross_weight) + (p.no_of_diamonds::numeric*p.diamond_price_per_item::numeric
            + ((((mdp.latest_price * CEIL((p.gold_purity::numeric*100)/24))/100 * p.gross_weight) + (p.no_of_diamonds::numeric*p.diamond_price_per_item::numeric))*12::numeric/100)
            ),2) AS product_today_price
        FROM 
            product p
         JOIN product_category pc ON p.product_category_id = pc.id
         JOIN product_occasion po ON po.product_id = p.id -- Join the linking table
         JOIN occasion o ON po.occasion_id = o.id -- Join the occasion table
         JOIN product_image pi ON pi.product_id = p.id
         JOIN metal m ON p.metal_id = m.id
         JOIN (
            SELECT 
                mdp.metal_id, 
                mdp.metal_price AS latest_price,
                latest_mdp.latest_date as latest_date
            FROM 
                metal_daily_price mdp
            INNER JOIN (
                SELECT 
                    metal_id, 
                    MAX(created_date) AS latest_date -- Get the latest date for each metal
                FROM                
                    metal_daily_price
                GROUP BY 
                    metal_id
            ) latest_mdp ON mdp.metal_id = latest_mdp.metal_id AND mdp.created_date = latest_mdp.latest_date
        ) mdp ON m.id = mdp.metal_id
        WHERE 
            p.id = $1 AND p.user_id = $2
        GROUP BY 
            p.id, pc.id, m.id, mdp.latest_price;

        `;
            const product = yield db_1.PostgresDataSource.query(rawQuery, [id, userId]);
            return product.length > 0 ? product[0] : null; // Assuming only one product matches
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findProduct = findProduct;
function findAllProducts(where, userId, skip, limit, orderField, order, search, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Dynamically build WHERE clause
            let whereConditions = "1=1"; // Default condition for no filtering
            // Add search condition if provided
            if (search && search != "") {
                whereConditions += ` AND (${search})`;
            }
            // Add filter condition if provided
            if (filter) {
                whereConditions += ` AND (${filter})`;
            }
            // Construct raw query with dynamic WHERE conditions
            const rawQuery = `
        SELECT 
            p.*, 
            pc.product_category_code AS product_category_code, 
            pc.product_category_name AS product_category_name, 
            m.metal_name,
            ARRAY_AGG(DISTINCT o.occasion) AS occasions, 
            ARRAY_AGG(DISTINCT (JSONB_BUILD_OBJECT('image', pi.image, 'id', pi.id)::TEXT)) AS product_images,
            mdp.latest_price AS latest_metal_price,
            MAX(mdp.latest_date) AS latest_metal_date,
            ROUND(((mdp.latest_price * CEIL((p.gold_purity::numeric*100)/24))/100 * p.gross_weight) + (p.no_of_diamonds::numeric*p.diamond_price_per_item::numeric
            + ((((mdp.latest_price * CEIL((p.gold_purity::numeric*100)/24))/100 * p.gross_weight) + (p.no_of_diamonds::numeric*p.diamond_price_per_item::numeric))*12::numeric/100)
            ),2) AS product_today_price
        FROM 
            product p
         JOIN product_category pc ON p.product_category_id = pc.id
         JOIN product_occasion po ON po.product_id = p.id
         JOIN occasion o ON po.occasion_id = o.id
         JOIN product_image pi ON pi.product_id = p.id
         JOIN metal m ON p.metal_id = m.id
        left JOIN (
            SELECT 
                mdp.metal_id, 
                mdp.metal_price AS latest_price,
                latest_mdp.latest_date AS latest_date
            FROM 
                metal_daily_price mdp
            INNER JOIN (
                SELECT 
                    metal_id, 
                    MAX(created_date) AS latest_date
                FROM 
                    metal_daily_price
                GROUP BY 
                    metal_id
            ) latest_mdp ON mdp.metal_id = latest_mdp.metal_id AND mdp.created_date = latest_mdp.latest_date
        ) mdp ON m.id = mdp.metal_id
        WHERE 
            p.user_id = $3 AND ${whereConditions}
        GROUP BY 
            p.id, pc.id, m.id, mdp.latest_price
        ORDER BY 
            ${orderField} ${order}
        LIMIT $1 OFFSET $2;
        `;
            // Execute the query
            const products = yield db_1.PostgresDataSource.query(rawQuery, [limit, skip, userId]);
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllProducts = findAllProducts;
