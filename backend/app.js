import express from "express";
import mongoose from "mongoose";
import { productsRoutes } from "./routes/productsRoutes.js";
import { connectDB } from "./db/connect.js";
const app = express();


const PORT = 3000;

app.use(express.json());

// Define a root route
app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
app.use("/app", productsRoutes);

// Start the server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  




