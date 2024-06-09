import express, { Request, Response } from "express"
import { AdminRoute } from "./admin";
/** crate global router */
export const createRouter = (): express.Router => {
    const router = express.Router();
    AdminRoute(router);
    return router;
}
