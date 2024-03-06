import mongoose from "mongoose";
const URL = "mongodb+srv://nainamanchanda9:blzJTRAvWLHv40mU@naina.6qyqohb.mongodb.net/?retryWrites=true&w=majority&appName=naina";

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
