// In routes/productRoutes.js

import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct , getProductsByCategory, } from "../controllers/productsControllers.js";

const productsRoutes = express.Router();

productsRoutes.post("/create_product", createProduct);
productsRoutes.get("/get_product/:id", getProduct); // Updated route for getting a single product
productsRoutes.delete("/delete/:id", deleteProduct); // Updated route for deleting a product
productsRoutes.get("/get_all_products", getAllProducts);
productsRoutes.get("/products_by_category/:category", getProductsByCategory);

export { productsRoutes };
