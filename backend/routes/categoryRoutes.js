import express from "express";
import { VerifyToken, isAdmin } from '../middlewares/auth.js'; // Import 
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js"
import categoryModel from "../models/categoryModel.js";;

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  VerifyToken,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  VerifyToken,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  VerifyToken,
  isAdmin,
  deleteCategoryCOntroller
);
router.get('/count',VerifyToken,isAdmin ,async (req, res) => {
  try {
    const count = await categoryModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;