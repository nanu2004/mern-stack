// controllers/productsControllers.js
import { ProductData } from "../models/productsModels.js";

// Controller to create a new product
const createProduct = async (req, res) => {
  const { title, brand, category, price, description } = req.body;

  try {
    const newProduct = await ProductData.create({
      title,
      brand,
      category,
      price,
      description,
    });

    return res.status(201).json({
      status: "Success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while creating the product",
      error: err.message,
    });
  }
};

// Controller to delete a product by ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!productId) {
      return res.status(400).json({
        status: "Failed",
        message: "Product ID is required in the URL parameters",
      });
    }

    const deletedProduct = await ProductData.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while deleting the product",
      error: err.message,
    });
  }
};

// Controller to get a single product by ID
const getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!productId) {
      return res.status(400).json({
        status: "Failed",
        message: "Product ID is required in the URL parameters",
      });
    }

    const product = await ProductData.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while fetching the product",
      error: err.message,
    });
  }
};

// Controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductData.find();

    return res.status(200).json({
      status: "Success",
      message: "All products fetched successfully",
      data: allProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while fetching all products",
      error: err.message,
    });
  }
};
// now our work is done
const getProductsByCategory = async (req, res) => {
  try {
    // get data from request body
    const category = req.params.category.toLowerCase();
    // get data from database
    const filterProducts = await ProductData.find({ category });
    // check whether data is true( if data is true then return as response true json data with filterd product)
    if (filterProducts.length) {
      res.json({
        totalProducts: filterProducts.length,
        filterProducts,
      });
    } else {
      res.json({
        message: "No Filtered data found / Plese re-check your category!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({
      message: "error while fetching data",
    });
  }
};

const searchProducts = async (req, res) => {
  const query = req.query.q; // Search query
  const category = req.query.category; // Category query

  try {
    let queryCondition = {};
    if (query) {
      queryCondition.category = { $regex: query, $options: 'i' };
    }
    if (category) {
      queryCondition.category = category.toLowerCase();
    }

    const filteredProducts = await ProductData.find(queryCondition);

    if (filteredProducts.length > 0) {
      return res.status(200).json({
        status: "Success",
        message: "Products found",
        data: filteredProducts,
      });
    } else {
      return res.status(404).json({
        status: "Failed",
        message: "No products found matching the search criteria",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while searching for products",
      error: err.message,
    });
  }
};
export { createProduct, deleteProduct, getProduct, getAllProducts,getProductsByCategory, searchProducts };