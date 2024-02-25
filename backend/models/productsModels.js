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
        enum: {
            values: ["electronics", "men's cloth", "jewellery", "electronics"], // Note: "electronics" is repeated, you may want to fix it
            message: `{VALUE} is not supported`,
        },
        required: true,
    },
    rating: {
        type: Number,
        default: 4.9,
    },
});

const Product = mongoose.model("Product", productSchema);

export { Product };
