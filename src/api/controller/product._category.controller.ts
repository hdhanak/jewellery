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
import { In } from "typeorm";
import { addProductCategory, deleteProductCategory, findAllProductsCategory, updateProductCategory } from "../model/product_category.model";

export const createProductCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: { email: string } = { email: req.body.email };
        const payloadRequest: any = {
            product_category_name: req.body.product_category_name as string,
            product_category_code: req.body.product_category_code as string,
            status: req.body.status as boolean
        };


        const result = await addProductCategory(where, payloadRequest);
        return successResponse(res, Constants.PRODUCT_CATEGORIES.CREATED_SUCCESSFULLY, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const updateProductCategoryByID = async (req: Request, res: Response): Promise<void> => {
    try {

        let where: object = { id: req.body.id };
        const payloadRequest: any = {
            product_category_name: req.body.product_category_name as string,
            product_category_code: req.body.product_category_code as string,
            status: req.body.status as boolean
        };

        const result = await updateProductCategory(where, payloadRequest);
        return successResponse(res, Constants.PRODUCT_CATEGORIES.UPDATED_SUCCESSFULLY, result);

    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const deleteProductCategoryByIds = async (req: Request, res: Response): Promise<void> => {
    try {
        const ids: string = req.body.ids; // Assuming IDs are provided as a comma-separated string
        const idArray: string[] = ids.split(',').map(id => id.trim()); // Convert comma-separated string to array of IDs
        console.log(idArray, "idArray");
        const result = await deleteProductCategory(idArray);

        // Return success response
        return successMessage(res, Constants.PRODUCT_CATEGORIES.DELETED_SUCCESSFULLY);
    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};

export const getAllProductCategory = async (req: Request, res: Response): Promise<void> => {
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

        const result = await findAllProductsCategory(where, skip, limit, orderField, order);

        // Return success response
        return successResponse(res, Constants.PRODUCT_CATEGORIES.RETRIEVED_ALL_SUCCESSFULLY, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
