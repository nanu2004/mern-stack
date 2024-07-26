import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide a valid email address!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password!"],
    minlength: 8
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: Number,
    default: 0, // Default value for role set to zero
    required: true,
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
