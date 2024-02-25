import mongoose from "mongoose";
import { connectDB } from "./db/connect.js";
import { Product } from "./models/productsModels.js";
import product from "./products.json";


const create = async () => {
    try {
        await mongoose.connect(connectDB()); // Ensure that connectDB is invoked
        await Product.create(product);
        console.log("success");
    } catch (error) {
        console.error("error:", error);
    } finally {
        mongoose.connection.close();
    }
};

create();
