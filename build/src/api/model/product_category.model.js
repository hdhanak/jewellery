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
exports.findAllProductsCategory = exports.deleteProductCategory = exports.updateProductCategory = exports.addProductCategory = void 0;
const constants_1 = require("../../config/constants");
const db_1 = require("../../config/db");
const logger_1 = require("../../lib/logger");
const product_category_entity_1 = require("../entity/product_category.entity");
function addProductCategory(whereClause, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const where = JSON.parse(JSON.stringify(whereClause));
            const createdProduct = yield db_1.PostgresDataSource.manager.save(db_1.PostgresDataSource.manager.create(product_category_entity_1.ProductCategory, productData));
            return createdProduct;
        }
        catch (error) {
            logger_1.logger.error(`Error adding product: ${error.message}`);
            throw error;
        }
    });
}
exports.addProductCategory = addProductCategory;
function updateProductCategory(whereClause, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const where = JSON.parse(JSON.stringify(whereClause));
            // Use query builder to update the product
            const updateResult = yield db_1.PostgresDataSource
                .createQueryBuilder()
                .update(product_category_entity_1.ProductCategory)
                .set(updateData)
                .where(where)
                .returning("*")
                .updateEntity(true)
                .execute();
            // Check if any rows were affected
            if (updateResult.affected === 0) {
                throw new Error(constants_1.Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
            }
            // Return the updated product
            return updateResult.raw;
        }
        catch (error) {
            logger_1.logger.error(`Error updating product: ${error.message}`);
            throw error;
        }
    });
}
exports.updateProductCategory = updateProductCategory;
function deleteProductCategory(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteResult = yield db_1.PostgresDataSource
                .createQueryBuilder()
                .delete()
                .from(product_category_entity_1.ProductCategory)
                .where(`id IN (:...ids)`, { ids })
                .returning("*")
                .execute();
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
exports.deleteProductCategory = deleteProductCategory;
function findAllProductsCategory(where, skip, limit, orderField, order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(skip, limit, orderField, order, "skip, limit, orderField, order");
            const query = db_1.PostgresDataSource
                .createQueryBuilder(product_category_entity_1.ProductCategory, "product_category")
                // .where(where)
                .skip(skip)
                .take(limit)
                .orderBy(orderField, order);
            const [products, count] = yield query.getManyAndCount();
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllProductsCategory = findAllProductsCategory;
