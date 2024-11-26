import { Request, Response, NextFunction } from "express";
// import { unauthorizedResponse, notFoundResponse } from '../helpers/apiResponse'
import { Constants } from "../../config/constants";
import { decode } from "../lib/jwt";
import { notFoundResponse, unauthorizedResponse } from "../../helpers/apiResponse";
declare global {
  namespace Express {
    interface Request {
      user?: any;  // Use `any` or replace with the correct type for `user`
    }
  }
}
const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  console.log(req.headers.authorization);
  const accessToken = req.headers.authorization;
  if (accessToken) {
    const token = accessToken.split(' ')[1];
    const { decoded, expired } = decode(token);
    if (decoded) {
      // @ts-ignore
      req.user = decoded
      console.log(req.body.user);
      if (req.body.userId != undefined) {
        if (req.body.userId != "") {
          if (req.body.userId != req.body.user.userId) {
            notFoundResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_INVALID_WITH_USERID);
          } else {
            unauthorizedResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_INVALID);
          }
        } else {

          return next();
        }
      } else {
        return next();
      }

    }
    if (expired) {
      unauthorizedResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_EXPIRED);
    }
  } else {
    unauthorizedResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_REQUIRED);
  }
}

export default verifyToken;
