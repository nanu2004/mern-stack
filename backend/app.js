import express from "express";
import cors from 'cors';
import { productsRoutes } from "./routes/productsRoutes.js";
import { authRouter } from "./routes/authRoutes.js"; // Import authentication routes
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";
import { default as wishlistRouter } from './routes/wishlistRouter.js';


dotenv.config();

// Create an Express application
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON in request bodies
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: ["http://localhost:5173"], // Replace with your frontend URL
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

// Enable CORS using the cors middleware with the defined options
app.use(cors(corsOptions));

// Define a root route
app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
app.use("/app", productsRoutes);
app.use("/auth", authRouter); // Mount authentication routes

app.use('/wishlist', wishlistRouter);


// Connect to the MongoDB database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };
