"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../api/controller/user.controller");
const product_controller_1 = require("../api/controller/product.controller");
const product__category_controller_1 = require("../api/controller/product._category.controller");
const middlewares_1 = require("../api/middlewares");
const multer_1 = __importDefault(require("multer"));
// Configure multer for handling FormData
// Define storage for the uploaded files
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product_images'); // Set the destination for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename
    }
});
// Create the multer instance with the storage configuration
const upload = (0, multer_1.default)({ storage: storage, limits: { fileSize: 100000000 } });
const route = express_1.default.Router();
// pm2 start ts-node -- -P tsconfig.json index.ts
/** guide router function */
const AdminRoute = (router) => {
    router.use("/admin", route);
    route.post("/signup", user_controller_1.signUp);
    route.post("/login", user_controller_1.login);
    route.post("/create-product-category", middlewares_1.verifyToken, product__category_controller_1.createProductCategory);
    route.post("/update-product-category", middlewares_1.verifyToken, product__category_controller_1.updateProductCategoryByID);
    route.post("/delete-product-categories", middlewares_1.verifyToken, product__category_controller_1.deleteProductCategoryByIds);
    route.post("/get-all-product-category", middlewares_1.verifyToken, product__category_controller_1.getAllProductCategory);
    route.post("/create-product", middlewares_1.verifyToken, upload.array('product_images', 30), product_controller_1.createProduct);
    route.post("/update-product", middlewares_1.verifyToken, upload.array('product_images', 30), product_controller_1.updateProductById);
    route.post("/delete-product", middlewares_1.verifyToken, product_controller_1.deleteProductByIds);
    route.post("/get-product-by-id", product_controller_1.getProducts);
    route.post("/get-all-product", product_controller_1.getAllProducts);
};
exports.AdminRoute = AdminRoute;
