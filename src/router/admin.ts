import express from "express";
import { login, signUp } from "../api/controller/user.controller";
import { createProduct, deleteProductByIds, getAllProducts, getProducts, updateProductById } from "../api/controller/product.controller";
import { updateProduct } from "../api/model/product.model";
import { createProductCategory, deleteProductCategoryByIds, getAllProductCategory, updateProductCategoryByID } from "../api/controller/product._category.controller";
import { deleteProductCategory, updateProductCategory } from "../api/model/product_category.model";
import { verifyToken } from "../api/middlewares";



const route = express.Router();
// pm2 start ts-node -- -P tsconfig.json index.ts
/** guide router function */
export const AdminRoute = (router: express.Router): void => {
  router.use("/admin", route);
  route.post("/signup", signUp);
  route.post("/login", login);

  route.post("/create-product-category", verifyToken, createProductCategory);
  route.post("/update-product-category", verifyToken, updateProductCategoryByID);
  route.post("/delete-product-categories", verifyToken, deleteProductCategoryByIds);
  route.post("/get-all-product-category", verifyToken, getAllProductCategory);

  route.post("/create-product", verifyToken, createProduct);
  route.post("/update-product", verifyToken, updateProductById);
  route.post("/delete-product", verifyToken, deleteProductByIds);
  route.post("/get-product-by-id", verifyToken, getProducts);
  route.post("/get-all-product", verifyToken, getAllProducts);

};
