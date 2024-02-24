import express from "express";
import { productsRoutes } from "./routes/productsRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());

// Define a root route
app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
app.use("/app", productsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});