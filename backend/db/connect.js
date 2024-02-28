import mongoose from "mongoose";
const URL =
  "mongodb+srv://nanu1:Ivd0ic2J3yG6rdPX@cluster0.gd6ejsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
export { connectDB };
