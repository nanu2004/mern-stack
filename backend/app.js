
// index.js or app.js
import 'dotenv/config'; // This line replaces require('dotenv').config()
import express from "express";
import { productsRoutes } from "./routes/productsRoutes.js";
import { connectDB } from "./db/connect.js";
const app = express();


const PORT = process.env.PORT || 5000;

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
  




