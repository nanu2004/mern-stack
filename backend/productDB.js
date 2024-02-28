import mongoose from "mongoose";
import { connectDB } from "./db/connect.js";
import { Product } from "./models/productsModels.js";
const data =[
    {
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "category": "men's clothing",
      "rating": 3.1
       
       
      
    },
    {
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "category": "men's clothing",
      "rating": 8.0
       
       
      
    },
    {
      "title": "Mens Cotton Jacket",
      "price": 55.99,
      "category": "men's clothing",
      "rating": 1.0
      
    },
    {
      "title": "Mens Casual Slim Fit",
      "price": 15.99,
      "category": "men's clothing",
      "rating": 2.1
       
       
      
    }
  ]

  

  const create = async () => {
    try {
      const connection = await connectDB();
      await Product.create(data);
      console.log("Success");

    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  create();
  
