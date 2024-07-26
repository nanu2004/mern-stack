import express from "express";
import formidable from "express-formidable";
import { VerifyToken, isAdmin } from "../middlewares/auth.js";
import Product from "../models/productModel.js"; // Ensure the model import is correct
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  braintreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";

const router = express.Router();

// Product routes
router.post(
  "/create-product",
  VerifyToken,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  VerifyToken,
  isAdmin,
  formidable(),
  updateProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", realtedProductController);

// Correctly define the route handler for counting products
router.get('/count', VerifyToken, isAdmin, async (req, res) => {
  try {
    console.log('Counting products...');
    const count = await Product.countDocuments();
    console.log('Count:', count);
    res.json({ count });
  } catch (error) {
    console.error('Error fetching count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get("/product-category/:slug", productCategoryController);

// Payments routes
router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", VerifyToken, brainTreePaymentController);

// Cash on Delivery route
router.post("/cod/payment", VerifyToken, brainTreePaymentController);

export default router;
