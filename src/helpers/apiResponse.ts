import { Constants } from "../config/constants";

/** success created */
export const successMessage = (res: any, msg: string): void => {
	const dataRes = {
		status: 1,
		message: msg
	};
	return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
}
export const successResponseWithCount = (res: any, msg: string, data: any, totalRecords: any): void => {
	const dataRes = {
		status: 1,
		message: msg,
		totalRecords: totalRecords,
		data: data
	};
	return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
}
export const successResponseWithCountWithProcessFLag = (res: any, msg: string, data: any, totalRecords: any, processingCount: any): void => {
	const dataRes = {
		status: 1,
		message: msg,
		isProcessing: processingCount > 0,
		totalRecords: totalRecords,
		data: data
	};
	return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
}
export const successResponseWithCountAndIds = (res: any, msg: string, data: any, totalRecords: any, ids: any): void => {
	const dataRes = {
		status: 1,
		message: msg,
		totalRecords: totalRecords,
		ids: ids,
		data: data
	};
	return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
}
/** success response with data */
export const successResponse = (res: any, msg: string, data: any): void => {
	const dataRes = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
}

/** error code */
export const ErrorResponse = (res: any, msg: any): void => {
	const dataRes = {
		status: 0,
		message: msg,
	};
	return res.status(Constants.ERROR_CODES.FAIL_CODE).json(dataRes);
}


/** not found code */
export const notFoundResponse = (res: any, msg: string): void => {
	const dataRes = {
		status: 0,
		message: msg,
		data: []
	};
	return res.status(Constants.ERROR_CODES.NOT_FOUND_CODE).json(dataRes);
}

/** not found code */
export const validationErrorWithData = (res: any, msg: string, data: any): void => {
	const dataRes = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(Constants.ERROR_CODES.REQUIRE_PARAMETER).json(dataRes);
}

/** for token expire */
export const unauthorizedResponse = (res: any, msg: string): void => {
	const dataRes = {
		status: 0,
		message: msg,
	};
	return res.status(Constants.ERROR_CODES.UNAUTHORIZED_CODE).json(dataRes);
}

/** not found code */
export const userExistsError = (res: any, msg: string): void => {
	const dataRes = {
		status: 0,
		message: msg,
	};
	return res.status(Constants.ERROR_CODES.USER_EXISTS).json(dataRes);
}
