import express from 'express'
import * as path from "path";
import bodyParser from 'body-parser'
import { env } from './src/env';
import { logger, loggerFile } from './src/lib/logger';
import { createRouter } from './src/router';


// import { createRouter } from './v1/routes'
// import {logger, loggerFile} from '../../../api/lib/logger'
/** create server module */
export const createServer = ():void =>{
 const app = express();
 const port = env.APPPORT || 3000;
 const host = env.HOST;
console.log(env.APPPORT,'env.APPPORT');
    /* To handle invalid JSON data request */
    app.use(express.json()); // for JSON data
    app.use(express.urlencoded({ limit: '100mb', extended: true })); // for URL-encoded data
    // app.use(bodyParser.json({limit: '50mb'}));

    // /* For parsing urlencoded data */
    // app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

 /** add header */
 app.use(function(req,res,next){
    if(env.NODE_ENV == "development"){
        /** set logger every http request */
        loggerFile.info(req.originalUrl);
        loggerFile.info(req.body)
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
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
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
app.use("/v1",createRouter());
app.listen(port,()=>{
    logger.info(`CT listening on port http://${host}:${port}`);
})


}

createServer()