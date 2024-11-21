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
import { toLowerCase } from "fp-ts/lib/string";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: { email: string } = { email: req.body.email };
        if (!req.body.product_category_id) {
            return ErrorResponse(res, Constants.PRODUCTS.INVALID_CATEGORY_ID);
        }
        const productImages = (req.files as Express.Multer.File[]).map(file => file.filename);

        const payloadRequest: any = {
            product_code: req.body.product_code as string,
            product_name: req.body.product_name as string,
            product_title: req.body.product_title as string,
            product_detail: req.body.product_detail as string,
            product_sub_detail: req.body.product_sub_detail as string,
            product_images: productImages as string[],
            product_category: parseInt(req.body.product_category_id as string, 10),
            product_type: parseInt(req.body.product_type as string, 10),
            occasion: req.body.occasion as string, // Assuming occasion is a comma-separated string
            gold_purity: parseInt(req.body.gold_purity as string, 10),
            gross_weight: parseFloat(req.body.gross_weight as string),
            gender: parseInt(req.body.gender as string, 10),
            height: parseFloat(req.body.height as string),
            width: parseFloat(req.body.width as string),
            size: req.body.size as string, // Assuming size is meant to remain a string
            diamond_clarity: parseInt(req.body.diamond_clarity as string, 10),
            diamond_color: req.body.diamond_color as string,
            diamond_weight: parseFloat(req.body.diamond_weight as string),
            no_of_diamonds: parseInt(req.body.no_of_diamonds as string, 10),
            metal: parseInt(req.body.metal_id as string, 10),
            status: req.body.status === 'true' // Converting to boolean
        };

        const result = await addProduct(where, payloadRequest);
        return successResponse(res, Constants.PRODUCTS.CREATED_SUCCESSFULLY, result);


    } catch (e: any) {
        console.log("Error: ", e);
        ErrorResponse(res, e.message ? e.message : e);
    }
};

export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        let where: { id: number } = { id: req.body.id };

        // Handle multiple file uploads
        const productImages = (req.files as Express.Multer.File[]).map(file => file.filename);

        const payloadRequest: any = {
            product_code: req.body.product_code as string,
            product_name: req.body.product_name as string,
            product_title: req.body.product_title as string,
            product_detail: req.body.product_detail as string,
            product_sub_detail: req.body.product_sub_detail as string,
            // product_images: productImages.length > 0 ? productImages : req.body.product_images as string[],
            product_category: parseInt(req.body.product_category_id as string, 10),
            product_type: parseInt(req.body.product_type as string, 10),
            // occasion: req.body.occasion as string, // Assuming occasion is a comma-separated string
            gold_purity: parseInt(req.body.gold_purity as string, 10),
            gross_weight: parseFloat(req.body.gross_weight as string),
            gender: parseInt(req.body.gender as string, 10),
            height: parseFloat(req.body.height as string),
            width: parseFloat(req.body.width as string),
            size: req.body.size as string, // Assuming size is meant to remain a string
            diamond_clarity: parseInt(req.body.diamond_clarity as string, 10),
            diamond_color: req.body.diamond_color as string,
            diamond_weight: parseFloat(req.body.diamond_weight as string),
            no_of_diamonds: parseInt(req.body.no_of_diamonds as string, 10),
            metal: parseInt(req.body.metal_id as string, 10),
            status: req.body.status === 'true' // Converting to boolean
        };

        const relationEntityPayloadRequest: any = {
            product_images: productImages.length > 0 ? productImages : req.body.product_images as string[],
            occasion: req.body.occasion as string, // Assuming occasion is a comma-separated string
        };

        const result = await updateProduct(where, payloadRequest, relationEntityPayloadRequest);
        return successResponse(res, Constants.PRODUCTS.UPDATED_SUCCESSFULLY, result);

    } catch (e: any) {
        console.log("Error: ", e);
        ErrorResponse(res, e.message ? e.message : e);
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
            order_by

        } = req.body ?? {};

        let where: any = {};
        var searchArr: string[] = [];
        var filterArr: string[] = [];

        let limit = (req.body.limit) ? parseInt(req.body.limit as string) : 10;
        let skip = (req.body.pageNo) ? getOffset(parseInt(req.body.pageNo as string), limit) : 0;

        console.log("test");
        var keys = req.body && req.body.filter && Object.keys(req?.body?.filter);
        if (keys.length > 0) {
            for (const key in req.body?.filter) {
                if (!(key == "limit" || key == "pageNo" || key == "customerOrganization" || key == "roles" || key == 'orderBy') && (req.body?.filter[key] || req.body?.filter[key] == false)) {
                    if (req.body.filter[key]) {
                        if ((typeof req.body.filter[key] === "string" || typeof req.body.filter[key] === "number" || typeof req.body.filter[key] === "boolean") && req.body.filter[key] !== "") {
                            where[`${key}`] = `%${toLowerCase((req.body.filter[key]).toString() as string)}%`;
                            if (key == 'occasion') {
                                searchArr.push(`cast(occasion.${key} AS VARCHAR) ILIKE :${key}`);
                            } else if (key == 'product_category_name') {
                                searchArr.push(`cast(product_category.${key} AS VARCHAR) ILIKE :${key}`);
                            } else {
                                searchArr.push(`cast(product.${key} AS VARCHAR) ILIKE :${key}`);
                            }
                        }
                    }
                }

                if (Array.isArray(req.body.filter[key]) && req.body.filter[key].length > 0) {
                    where[`${key}`] = req.body.filter[key];
                    if (key == "occasion") {
                        filterArr.push(`occasion.${key} IN(:...${key})`);
                    } else if (key == "product_category_name") {
                        filterArr.push(`product_category.${key} IN(:...${key})`);
                    } else {
                        filterArr.push(`product.${key} IN(:...${key})`);
                    }
                }
            }
        }


        let search: string = searchArr.length > 0 ? searchArr.join(" AND ") : ``;
        let filter: string = filterArr.length > 0 ? filterArr.join(" AND ") : ``;

        var tableName = (order_by?.field_name == 'occasion') ? "occasion" : (order_by?.field_name == 'product_category_name') ? "product_category" : "product";
        var fieldName = order_by?.field_name ?? "id";

        var orderField = `${tableName}.${fieldName}`;
        var order = order_by?.order ?? "DESC";

        console.log(where, "where");
        console.log(search, "search");
        console.log(filter, "filter");

        const result = await findAllProducts(where, skip, limit, orderField, order, search, filter);

        // Return success response
        return successResponse(res, Constants.PRODUCTS.RETRIEVED_ALL_SUCCESSFULLY, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
