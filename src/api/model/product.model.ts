import { SelectQueryBuilder } from "typeorm";
import { Constants } from "../../config/constants";
import { PostgresDataSource } from "../../config/db";
import { logger } from "../../lib/logger";
import { Product } from "../entity/product.entity";

export async function addProduct(whereClause: object, productData: any): Promise<object> {
    try {

        const where = JSON.parse(JSON.stringify(whereClause));

        const createdProduct = await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Product, productData));

        return createdProduct;
    } catch (error: any) {
        logger.error(`Error adding product: ${error.message}`);
        throw error;
    }
}

export async function updateProduct(whereClause: object, updateData: any): Promise<object> {
    try {
        const where = JSON.parse(JSON.stringify(whereClause));

        // Use query builder to update the product
        const updateResult = await PostgresDataSource
            .createQueryBuilder()
            .update(Product)
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

export async function deleteProduct(ids: any): Promise<object> {
    try {
        const deleteResult = await PostgresDataSource
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where(`id IN (:...ids)`, { ids: ids })
            .execute()


        // Check if any rows were affected
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

export async function findProduct(id: number): Promise<Product | null> {
    try {
        const query: SelectQueryBuilder<Product> = PostgresDataSource
            .createQueryBuilder(Product, "product")
            .leftJoinAndSelect("product.product_category", "product_category")
            .where("product.id =:id", { id });

        const product = await query.getOne();
        return product;
    } catch (error) {
        throw error;
    }
}

export async function findAllProducts(where: any, skip: number, limit: number, orderField: string, order: any): Promise<Product[]> {
    try {
        console.log(skip, limit, orderField, order, "skip, limit, orderField, order");
        const query: SelectQueryBuilder<Product> = PostgresDataSource
            .createQueryBuilder(Product, "product")
            .leftJoinAndSelect("product.product_category", "product_category")
            .skip(skip)
            .take(limit)
            .orderBy(`product.${orderField}`, order);

        const [products, count] = await query.getManyAndCount();
        return products;
    } catch (error) {
        throw error;
    }
}
