import { SelectQueryBuilder } from "typeorm";
import { Constants } from "../../config/constants";
import { PostgresDataSource } from "../../config/db";
import { logger } from "../../lib/logger";
import { Product } from "../entity/product.entity";
import { ProductImage } from "../entity/product_images.entity";
import { ProductOccasion } from "../entity/product_occasion.entity";
import { log } from "console";

export async function addProduct(whereClause: object, productData: any): Promise<object> {
    try {

        const where = JSON.parse(JSON.stringify(whereClause));

        const createdProduct = await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Product, productData));
        console.log(productData, "productData.product_images");
        if (productData && productData.product_images.length != 0) {
            const productImageEntities = productData.product_images.map((imageUrl: string) => {
                if (imageUrl) {
                    return PostgresDataSource.manager.create(ProductImage, {
                        product: createdProduct,
                        image: imageUrl
                    });
                }
            });

            await PostgresDataSource.manager.save(ProductImage, productImageEntities);
        }

        if (productData && productData.occasion != null) {
            console.log(productData.occasion.split(','), "split");
            const productOccasionEntities = productData.occasion.split(',').map((occasion: number) => {
                if (occasion) {
                    return PostgresDataSource.manager.create(ProductOccasion, {
                        product_id: createdProduct.id,
                        occasion_id: occasion
                    });
                }
            });
            await PostgresDataSource.manager.save(ProductOccasion, productOccasionEntities);
        }
        return createdProduct;
    } catch (error: any) {
        logger.error(`Error adding product: ${error.message}`);
        throw error;
    }
}

export async function updateProduct(whereClause: object, updateData: any): Promise<object> {
    try {
        const where = JSON.parse(JSON.stringify(whereClause));

        // Update the product information
        const updateResult = await PostgresDataSource
            .createQueryBuilder()
            .update(Product)
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
            return new Error(Constants.PRODUCTS.NOT_FOUND_OR_NO_CHANGES_APPLIED);
        }

        const updatedProduct = updateResult.raw[0];
        console.log("111");
        // Handle product images
        if (updateData && updateData.product_images.length !== 0) {
            // First, remove existing images
            console.log("1212");

            await PostgresDataSource.manager.delete(ProductImage, { product_id: updatedProduct.id });

            // Then, add new images
            const productImageEntities = updateData.product_images.map((imageUrl: string) => {
                if (imageUrl) {
                    return PostgresDataSource.manager.create(ProductImage, {
                        product: updatedProduct,
                        image: imageUrl
                    });
                }
            });

            await PostgresDataSource.manager.save(ProductImage, productImageEntities);
        }
        console.log("222");

        // Handle occasion data
        if (updateData && updateData.occasion != null) {
            // First, remove existing occasions
            console.log("12***12");

            await PostgresDataSource.manager.delete(ProductOccasion, { product_id: updatedProduct.id });

            // Then, add new occasions
            const productOccasionEntities = updateData.occasion.split(',').map((occasion: number) => {
                if (occasion) {
                    return PostgresDataSource.manager.create(ProductOccasion, {
                        product_id: updatedProduct.id,
                        occasion_id: occasion
                    });
                }
            });

            await PostgresDataSource.manager.save(ProductOccasion, productOccasionEntities);
        }
        console.log("3333");

        // Return the updated product
        return updatedProduct;
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
