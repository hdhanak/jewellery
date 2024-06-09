import { Request, Response } from "express";
import { logger } from "../../lib/logger";
import {
    ErrorResponse,
    successMessage,
    successResponse,
} from "../../helpers/apiResponse";
import { getOffset } from "../../helpers/utility";
import { Constants } from "../../config/constants";
import { addProduct, deleteProduct, findAllProducts, findProduct, updateProduct } from "../model/product.model";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: { email: string } = { email: req.body.email };
        if (!req.body.product_category_id) {
            return ErrorResponse(res, Constants.PRODUCTS.INVALID_CATEGORY_ID);
        }

        const payloadRequest: any = {
            product_code: req.body.product_code as string,
            product_name: req.body.product_name as string,
            product_title: req.body.product_title as string,
            product_detail: req.body.product_detail as string,
            product_sub_detail: req.body.product_sub_detail as string,
            product_image: req.body.product_image as string,
            product_category: req.body.product_category_id as number,
            product_type: req.body.product_type as number,
            occasion: req.body.occasion as string,
            gold_purity: req.body.gold_purity as number,
            gross_weight: req.body.gross_weight as string,
            gender: req.body.gender as number,
            height: req.body.height as string,
            width: req.body.width as string,
            size: req.body.size as string,
            diamond_clarity: req.body.diamond_clarity as string,
            diamond_color: req.body.diamond_color as string,
            diamond_weight: req.body.diamond_weight as string,
            no_of_diamonds: req.body.no_of_diamonds as number,
            status: req.body.status as boolean
        };

        const result = await addProduct(where, payloadRequest);
        return successResponse(res, Constants.PRODUCTS.CREATED_SUCCESSFULLY, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: object = { id: req.body.id };
        const payloadRequest: any = {
            product_code: req.body.product_code as string,
            product_name: req.body.product_name as string,
            product_title: req.body.product_title as string,
            product_detail: req.body.product_detail as string,
            product_sub_detail: req.body.product_sub_detail as string,
            product_image: req.body.product_image as string,
            product_category: req.body.product_category_id as number,
            product_type: req.body.product_type as number,
            occasion: req.body.occasion as string,
            gold_purity: req.body.gold_purity as number,
            gross_weight: req.body.gross_weight as string,
            gender: req.body.gender as number,
            height: req.body.height as string,
            width: req.body.width as string,
            size: req.body.size as string,
            diamond_clarity: req.body.diamond_clarity as string,
            diamond_color: req.body.diamond_color as string,
            diamond_weight: req.body.diamond_weight as string,
            no_of_diamonds: req.body.no_of_diamonds as number,
            status: req.body.status as boolean
        };
        const result = await updateProduct(where, payloadRequest);
        return successResponse(res, Constants.PRODUCTS.UPDATED_SUCCESSFULLY, result);

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const deleteProductByIds = async (req: Request, res: Response): Promise<void> => {
    try {
        const ids: string = req.body.ids; // Assuming IDs are provided as a comma-separated string
        const idArray: string[] = ids.split(',').map(id => id.trim()); // Convert comma-separated string to array of IDs
        // const where: object = { id: In(idArray) }; // Assuming the primary key of the Product entity is named 'id'

        // Call deleteProduct function to delete product(s) by IDs
        const result = await deleteProduct(idArray);

        // Return success response
        return successMessage(res, Constants.PRODUCTS.DELETED_SUCCESSFULLY);
    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};


export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = req.body.id; // Assuming IDs are provided as a comma-separated string

        const result = await findProduct(id);

        // Return success response
        return successResponse(res, Constants.PRODUCTS.RETRIEVED_SUCCESSFULLY, result);

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        let {
            orderBy

        } = req.body ?? {};

        let where: any = {};
        var filter: any = [];


        let limit = (req.body.limit) ? parseInt(req.body.limit as string) : 10;
        let skip = (req.body.pageNo) ? getOffset(parseInt(req.body.pageNo as string), limit) : 0;

        // var keys = Object.keys(req.body);
        // if (keys.length > 0) {
        //     for (const key in req.body) {
        //         if (!(key == "limit" || key == "pageNo" || key == "customerOrganization" || key == "roles" || key == 'orderBy') && (req.body[key] || req.body[key] == false)) {
        //             if (req.body[key]) {
        //                 if ((typeof req.body[key] === "string" || typeof req.body[key] === "number" || typeof req.body[key] === "boolean") && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(users.${key} AS VARCHAR) ILIKE :${key}`);
        //                 }

        //             }
        //         }
        //         if (key == "roles") {
        //             if (req.body[key]) {
        //                 if (typeof req.body[key] === "string" && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(roles.name AS VARCHAR) ILIKE :${key}`);
        //                 }

        //             }
        //         } else if (key == "customerOrganization") {
        //             if (req.body[key]) {
        //                 if (typeof req.body[key] === "string" && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(customerOrganization.companyName AS VARCHAR) ILIKE :${key}`);
        //                 } else if (typeof req.body[key] === "number" && req.body[key] !== "") {
        //                     where[`${key}`] = `%${toLowerCase((req.body[key]).toString() as string)}%`;
        //                     filter.push(`cast(customerOrganization.id AS VARCHAR) ILIKE :${key}`);
        //                 }

        //             }
        //         }
        //     }
        // }


        // let str = filter.length > 0 ? filter.join(" AND ") : ``;
        console.log(where, "where");

        console.log(filter, "cond");

        var orderField: string = orderBy?.fieldName ?? "id";
        var order = orderBy?.order ?? "DESC";

        const result = await findAllProducts(where, skip, limit, orderField, order);

        // Return success response
        return successResponse(res, Constants.PRODUCTS.RETRIEVED_ALL_SUCCESSFULLY, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
