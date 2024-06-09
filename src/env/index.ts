import dotenv from 'dotenv'
dotenv.config()
/** export env constant */
export const env = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    APPPORT: process.env.PORT,
    WEBSITE_URL: process.env.WEBSITE_URL,
    JWT_TIMEOUT_DURATION: process.env.JWT_TIMEOUT_DURATION,
    LOG_LEVEL: process.env.LOG_LEVEL,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    FCM_SERVER_KEY: process.env.FCM_SERVER_KEY,
    SITE_TITLE: process.env.SITE_TITLE,
}
