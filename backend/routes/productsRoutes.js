// routes/productRoutes.js

import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, getProductsByCategory, searchProducts } from "../controllers/productsControllers.js";

const productsRoutes = express.Router();

productsRoutes.post("/create_product", createProduct);
productsRoutes.get("/get_product/:id", getProduct);
productsRoutes.delete("/delete/:id", deleteProduct);
productsRoutes.get("/get_all_products", getAllProducts);
productsRoutes.get("/products_by_category/:category", getProductsByCategory);
productsRoutes.get("/search", searchProducts); // Route for searching products by name and/or category

export { productsRoutes };
