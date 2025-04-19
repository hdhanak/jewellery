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
        console.log(req.user.user_id,"req.body.user");

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
            diamond_clarity: req.body.diamond_clarity ? parseInt(req.body.diamond_clarity as string, 10) : 0,
            diamond_color: req.body.diamond_color || '', // Default to empty string if diamond_color is not provided
            diamond_weight: req.body.diamond_weight ? parseFloat(req.body.diamond_weight as string) : 0,
            no_of_diamonds: req.body.no_of_diamonds ? parseInt(req.body.no_of_diamonds as string, 10) : 0,
            metal: parseInt(req.body.metal_id as string, 10),
            diamond_price_per_item: req.body.diamond_price_per_item ? parseFloat(req.body.diamond_price_per_item as string) : 0,
            extra_add_price: req.body.extra_add_price ? parseFloat(req.body.extra_add_price as string) : 0,
            status: req.body.status === 'true',
            users: req.user.user_id
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

        const productImages = (req.files as Express.Multer.File[]).map(file => file.filename);

        const updateData: any = {
            product_code: req.body?.product_code ?? undefined,
            product_name: req.body?.product_name ?? undefined,
            product_title: req.body?.product_title ?? undefined,
            product_detail: req.body?.product_detail ?? undefined,
            product_sub_detail: req.body?.product_sub_detail ?? undefined,
            product_category: req.body?.product_category !== undefined ? parseInt(req.body?.product_category, 10) : undefined,
            product_type: req.body?.product_type !== undefined ? parseInt(req.body?.product_type, 10) : undefined,
            gold_purity: req.body?.gold_purity !== undefined ? parseInt(req.body?.gold_purity, 10) : undefined,
            gross_weight: req.body?.gross_weight !== undefined ? parseFloat(req.body?.gross_weight) : undefined,
            gender: req.body?.gender !== undefined ? parseInt(req.body?.gender, 10) : undefined,
            height: req.body?.height !== undefined ? parseFloat(req.body?.height) : undefined,
            width: req.body?.width !== undefined ? parseFloat(req.body?.width) : undefined,
            size: req.body?.size ?? undefined,
            diamond_clarity: req.body?.diamond_clarity !== undefined ? parseInt(req.body?.diamond_clarity, 10) : undefined,
            diamond_color: req.body?.diamond_color ?? undefined,
            diamond_weight: req.body?.diamond_weight !== undefined ? parseFloat(req.body?.diamond_weight) : undefined,
            no_of_diamonds: req.body?.no_of_diamonds !== undefined ? parseInt(req.body?.no_of_diamonds, 10) : undefined,
            metal: req.body?.metal_id !== undefined ? parseInt(req.body?.metal_id, 10) : undefined,
            diamond_price_per_item: req.body?.diamond_price_per_item !== undefined ? parseFloat(req.body?.diamond_price_per_item) : undefined,
            extra_add_price: req.body?.extra_add_price !== undefined ? parseFloat(req.body?.extra_add_price) : undefined,
            status: req.body.status === 'true' ? true : false,
        };

        // Remove undefined fields from updateData to avoid issues in the query
        const payloadRequest = Object.fromEntries(
            Object.entries(updateData).filter(([_, value]) => value !== undefined)
        );
        const relationEntityPayloadRequest: any = {
            product_images: productImages.length > 0 ? productImages : req.body.product_images as string[],
            occasion: req.body.occasion as string,
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
        const userId: number = req?.user?.user_id || 1

        const result = await findProduct(userId, id);

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
        // console.log(req.user.user_id,"req.body.user.userId");
        
        const userId: number =  1
        let where: any = {};
        var searchArr: string[] = [];
        var filterArr: string[] = [];
        let productTodayPriceFilter:string = ""
        console.log("it sbackend");

        let limit = (req.body.limit) ? parseInt(req.body.limit as string) : 10;
        let skip = (req.body.pageNo) ? getOffset(parseInt(req.body.pageNo as string), limit) : 0;

        var keys = req.body && req.body.filter && Object.keys(req?.body?.filter);
        if (keys?.length > 0) {
            for (const key in req.body?.filter) {
                if (!(key == "limit" || key == "pageNo" || key == "product_today_price" || key == "roles" || key == 'orderBy') && (req.body?.filter[key] || req.body?.filter[key] == false)) {
                    if (req.body.filter[key]) {
                        if ((typeof req.body.filter[key] === "string" || typeof req.body.filter[key] === "number" || typeof req.body.filter[key] === "boolean") && req.body.filter[key] !== "") {
                            const value = `%${toLowerCase((req.body.filter[key]).toString() as string)}%`;
                            if (key == 'occasion') {
                                searchArr.push(`cast(o.${key} AS VARCHAR) ILIKE '${value}'`);
                            } else if (key == 'product_category_code') {
                                searchArr.push(`cast(pc.${key} AS VARCHAR) ILIKE '${value}'`);
                            } else {
                                searchArr.push(`cast(p.${key} AS VARCHAR) ILIKE '${value}'`);
                            }
                        }
                    }
                }

                if (Array.isArray(req.body.filter[key]) && req.body.filter[key].length > 0) {
                    const value = req.body.filter[key];
                    const formattedValues = value.map((v: any) => `'${v}'`).join(", "); // Format array values into a SQL-compatible string

                    if (key === "occasion") {
                        filterArr.push(`o.${key} IN(${formattedValues})`);
                    } else if (key === "product_category_code") {
                        filterArr.push(`pc.${key} IN(${formattedValues})`);
                    }else if(key == 'product_today_price'){
                        // filterArr.push(`product_all_details.${key} BETWEEN ${value[0]} AND ${value[1]}`);
                        productTodayPriceFilter = `product_all_details.${key} BETWEEN ${value[0]} AND ${value[1]}`
                    }else {
                        filterArr.push(`p.${key} IN(${formattedValues})`);
                    }
                }

            }
        }


        let search: string = searchArr && searchArr?.length > 0 ? searchArr.join(" AND ") : ``;
        let filter: string = filterArr?.length > 0 ? filterArr.join(" AND ") : ``;

        var tableName = (order_by?.field_name == 'occasion') ? "o" : (order_by?.field_name == 'product_category_code') ? "pc" : "product_all_details";
        var fieldName = order_by?.field_name ?? "id";

        var orderField = `${tableName}.${fieldName}`;
        var order = order_by?.order ?? "DESC";

        console.log(where, "where");
        console.log(search, "search");
        console.log(filter, "filter");

        const result = await findAllProducts(where, userId, skip, limit, orderField, order, search, filter,productTodayPriceFilter);

        // Return success response
        return successResponse(res, Constants.PRODUCTS.RETRIEVED_ALL_SUCCESSFULLY, result);


    } catch (e) {
        logger.error(e);
        ErrorResponse(res, e);
    }
};
