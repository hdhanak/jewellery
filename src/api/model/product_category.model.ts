import { SelectQueryBuilder } from "typeorm";
import { Constants } from "../../config/constants";
import { PostgresDataSource } from "../../config/db";
import { logger } from "../../lib/logger";
import { ProductCategory } from "../entity/product_category.entity";

export async function addProductCategory(whereClause: object, productData: any): Promise<object> {
    try {

        const where = JSON.parse(JSON.stringify(whereClause));

        const createdProduct = await PostgresDataSource.manager.save(PostgresDataSource.manager.create(ProductCategory, productData));

        return createdProduct;
    } catch (error: any) {
        logger.error(`Error adding product: ${error.message}`);
        throw error;
    }
}

export async function updateProductCategory(whereClause: object, updateData: any): Promise<object> {
    try {
        const where = JSON.parse(JSON.stringify(whereClause));

        // Use query builder to update the product
        const updateResult = await PostgresDataSource
            .createQueryBuilder()
            .update(ProductCategory)
            .set(updateData)
            .where(where)
            .returning("*")
            .updateEntity(true)
            .execute();

        // Check if any rows were affected
        if (updateResult.affected === 0) {
            throw new Error(Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
        }

        // Return the updated product
        return updateResult.raw;
    } catch (error: any) {
        logger.error(`Error updating product: ${error.message}`);
        throw error;
    }
}

export async function deleteProductCategory(ids: object): Promise<object> {
    try {
        const deleteResult = await PostgresDataSource
            .createQueryBuilder()
            .delete()
            .from(ProductCategory)
            .where(`id IN (:...ids)`, { ids })
            .returning("*")
            .execute();

        if (deleteResult.affected === 0) {
            throw new Error(Constants.PRODUCTS.NO_PRODUCTS_FOUND_TO_DELETE);
        }

        // Return the delete result
        return deleteResult.raw;
    } catch (error: any) {
        logger.error(`Error deleting product(s): ${error.message}`);
        throw error;
    }
}

export async function findAllProductsCategory(where: any, skip: number, limit: number, orderField: string, order: any): Promise<ProductCategory[]> {
    try {
        console.log(skip, limit, orderField, order, "skip, limit, orderField, order");
        const query: SelectQueryBuilder<ProductCategory> = PostgresDataSource
            .createQueryBuilder(ProductCategory, "product_category")
            // .where(where)
            .skip(skip)
            .take(limit)
            .orderBy(orderField, order)


        const [products, count] = await query.getManyAndCount()
        return products
    } catch (error) {
        throw error;
    }
}

