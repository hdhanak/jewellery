import express from "express";
import { login, signUp, welcome } from "../api/controller/user.controller";
import { createProduct, deleteProductByIds, getAllProducts, getProducts, updateProductById } from "../api/controller/product.controller";
import { createProductCategory, deleteProductCategoryByIds, getAllProductCategory, updateProductCategoryByID } from "../api/controller/product._category.controller";
import { verifyToken } from "../api/middlewares";
import multer from 'multer';

// Configure multer for handling FormData
// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product_images'); // Set the destination for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename
  }
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage, limits: { fileSize: 100000000 } });

const route = express.Router();
// pm2 start ts-node -- -P tsconfig.json index.ts
/** guide router function */
export const AdminRoute = (router: express.Router): void => {
  router.use("/", route);
  route.get("/", welcome);
  route.post("/signup", signUp);
  route.post("/login", login);

  route.post("/create-product-category", verifyToken, createProductCategory);
  route.post("/update-product-category", verifyToken, updateProductCategoryByID);
  route.post("/delete-product-categories", verifyToken, deleteProductCategoryByIds);
  route.post("/get-all-product-category", verifyToken, getAllProductCategory);

  route.post("/create-product", verifyToken, upload.array('product_images', 30), createProduct);
  route.post("/update-product", verifyToken, upload.array('product_images', 30), updateProductById);
  route.post("/delete-product", verifyToken, deleteProductByIds);
  route.post("/get-product-by-id", getProducts);
  route.post("/get-all-product", getAllProducts);

  

};
