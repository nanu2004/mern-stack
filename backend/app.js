// index.js or app.js

// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

// Import routes and database connection
import { productRoutes } from "./routes/productRoutes.js";
import { connectDB } from "./db/connect.js";

// Create an Express application
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON in request bodies and CORS
app.use(express.json());
app.use(cors());

// Define a root route
app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
app.use("/app", productRoutes);

// Connect to the MongoDB database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
