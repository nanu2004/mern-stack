import express from "express";
import {
  getAllProducts,
  getAllProductsTesting,
} from "../controllers/productsControllers.js";
const productsRoutes = express.Router();

// Define your route
productsRoutes.get("/get_all_Products", getAllProducts);
productsRoutes.get("/get_all_Products_for_testing",
  getAllProductsTesting
);

export { productsRoutes };