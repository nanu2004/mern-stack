// The User model represents users who can register, log in, and interact with your blog website.
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
    minlength:8
  }
  
});
export const User = mongoose.model("User", userSchema);