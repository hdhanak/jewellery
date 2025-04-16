"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const env_1 = require("./src/env");
const logger_1 = require("./src/lib/logger");
const router_1 = require("./src/router");
// import { createRouter } from './v1/routes'
// import {logger, loggerFile} from '../../../api/lib/logger'
/** create server module */
const createServer = () => {
    const app = (0, express_1.default)();
    const port = env_1.env.APPPORT || 8000;
    const host = env_1.env.HOST;
    console.log(env_1.env.APPPORT, 'env.APPPORT');
    /* To handle invalid JSON data request */
    app.use(express_1.default.json()); // for JSON data
    app.use(express_1.default.urlencoded({ limit: '100mb', parameterLimit: 100000000, extended: true })); // for URL-encoded data
    app.use('/uploads', express_1.default.static(path.join(__dirname, 'uploads')));
    // app.use(bodyParser.json({limit: '50mb'}));
    // /* For parsing urlencoded data */
    // app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
    /** add header */
    app.use(function (req, res, next) {
        if (env_1.env.NODE_ENV == "development") {
            /** set logger every http request */
            logger_1.loggerFile.info(req.originalUrl);
            logger_1.loggerFile.info(req.body);
        }
        /*CORS headers*/
        var responseSettings = {
            "AccessControlAllowOrigin": req.headers.origin,
            "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
            "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
            "AccessControlAllowCredentials": 'true'
        };
        // Set custom headers for CORS
        res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
        res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
        res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
        res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
        if ('OPTIONS' == req.method) {
            res.send(200).end();
        }
        else {
            next();
        }
    });
    /** create database connection */
    // dbConnectionCreate();
    // pgConnectionCreate();
    /** router */
    app.use("/v1", (0, router_1.createRouter)());
    app.listen(port, () => {
        logger_1.logger.info(`CT listening on port http://${host}:${port}`);
    });
};
exports.createServer = createServer;
(0, exports.createServer)();
