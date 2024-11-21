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

        const createdProduct = await PostgresDataSource.manager.save(PostgresDataSource.manager.create(Product, productData));

        if (productData && productData.product_images && productData.product_images.length != 0) {
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

        if (productData && productData.occasion && productData.occasion != null) {
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
        const productAllDetails = await PostgresDataSource.getRepository(Product).findOne({
            where: { id: createdProduct.id },
            relations: ["product_images"],
        });

        if (!productAllDetails) {
            throw new Error(`Product with ID ${createdProduct.id} not found.`);
        }

        return productAllDetails;
    } catch (error: any) {
        logger.error(`Error adding product: ${error.message}`);
        if (error?.message.includes(`"UQ_metal_id_product_code"`)) {
            throw new Error(
                `A product with this code already exists for the selected metal. Please try using a unique product code or choose a different metal (e.g., Gold, Silver, or Platinum).`
            );
        } else {
            throw new Error(`Unexpected error occurred: ${error.message}`);
        }


    }
}

export async function updateProduct(whereClause: object, updateData: any, relationEntityPayloadRequest: any): Promise<object> {
    try {
        const where = JSON.parse(JSON.stringify(whereClause));
        console.log(where, "where");

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
        if (relationEntityPayloadRequest && relationEntityPayloadRequest.product_images && relationEntityPayloadRequest.product_images.length !== 0) {
            // First, remove existing images
            console.log("1212");

            await PostgresDataSource.manager.delete(ProductImage, { product: updatedProduct.id });

            // Then, add new images
            const productImageEntities = relationEntityPayloadRequest.product_images.map((imageUrl: string) => {
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
        if (relationEntityPayloadRequest && relationEntityPayloadRequest.occasion && relationEntityPayloadRequest.occasion != null) {
            // First, remove existing occasions
            console.log("12***12");

            await PostgresDataSource.manager.delete(ProductOccasion, { product_id: updatedProduct.id });

            // Then, add new occasions
            const productOccasionEntities = relationEntityPayloadRequest.occasion.split(',').map((occasion: number) => {
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
        if (error?.message.includes(`"UQ_metal_id_product_code"`)) {
            throw new Error(
                `A product with this code already exists for the selected metal. Please try using a unique product code or choose a different metal (e.g., Gold, Silver, or Platinum).`
            );
        } else {
            throw new Error(`Unexpected error occurred: ${error.message}`);
        }

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

export async function findProduct(id: number): Promise<any | null> {
    try {
        const rawQuery = `
            SELECT 
            p.*, 
            pc.product_category_code AS product_category_code, 
            pc.product_category_name AS product_category_name, 
            m.metal_name,
            ARRAY_AGG(DISTINCT o.occasion) AS occasions, 
            ARRAY_AGG(DISTINCT pi.image) AS product_images,
            mdp.latest_price AS latest_metal_price,
            max(mdp.latest_date) AS latest_metal_date,
            TO_CHAR(mdp.latest_price * p.gross_weight, 'FM999999999999.00') AS product_today_price
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
            p.id = $1
        GROUP BY 
            p.id, pc.id, m.id, mdp.latest_price;

        `;

        const product = await PostgresDataSource.query(rawQuery, [id]);
        return product.length > 0 ? product[0] : null; // Assuming only one product matches
    } catch (error) {
        throw error;
    }
}
export async function findAllProducts(where: any, skip: number, limit: number, orderField: string, order: any, search: string, filter: string): Promise<Product[]> {
    try {
        console.log(skip, limit, orderField, order, "skip, limit, orderField, order");
        const query: SelectQueryBuilder<Product> = PostgresDataSource
            .createQueryBuilder(Product, "product")
            .leftJoinAndSelect("product.product_category", "product_category")
            .leftJoinAndSelect("product.occasion", "occasion")
            .leftJoinAndSelect("product.product_images", "product_images")
            .where(search ? search : "1=1", { ...where })
            .andWhere(filter ? filter : "1=1", { ...where })
            .skip(skip)
            .take(limit)
            .orderBy(`${orderField}`, order);

        const [products, count] = await query.getManyAndCount();
        return products;
    } catch (error) {
        throw error;
    }
}
