// In routes/productRoutes.js

import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct } from "../controllers/productsControllers.js";

const productRoutes = express.Router();

productRoutes.post("/create_product", createProduct);
productRoutes.get("/get_product/:id", getProduct); // Updated route for getting a single product
productRoutes.delete("/delete/:id", deleteProduct); // Updated route for deleting a product
productRoutes.get("/get_all_products", getAllProducts);

export { productRoutes };
