import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
    },
    category: {
        type: String,

        required: true,
    },
    rating: {
        type: Number,
        default: 4.9,
    },
});

const Product = mongoose.model("Product", productSchema);

export { Product };

