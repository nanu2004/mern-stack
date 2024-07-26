import { User } from '../models/userModels.js';
import orderModel from "../models/orderModel.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 import  dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Controller for user registration (signup)
const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, address, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashedPassword, phone, address,role }); // Include role here
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '12h' });

    // Set the token as a cookie in the response
    res.cookie('token', token, { httpOnly: true, maxAge: 43200000 }); // Cookie expires in 12 hours

    // Send response with user ID, role, and token in JSON format
    res.status(200).json({ message: 'Login successful', userId: user._id, role: user.role, token }); // Include role here
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting user data using token
const getUserDataByToken = async (req, res) => {
  try {
    // VerifyToken middleware will handle token verification
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send response with user data including the role
    res.status(200).json({ 
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone, // Include phone here
      address: user.address, 
      role: user.role // Include role here
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Update user with reset token and expiry
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    await user.save();

    res.status(200).json({ message: 'Password reset token generated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for resetting password with valid token
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: new Date() }, // Token should be valid (not expired)
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile controller
const updateProfileController = async (req, res) => {
  try {
    const { firstname, lastname, password, address, phone } = req.body;

    // Get the token from the request cookies
    const token = req.cookies.token;

    // Verify the token to get the user ID
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decoded.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: Validate password length
    if (password && password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Hash the new password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Update user fields if provided or keep existing values
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.password = hashedPassword || user.password;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    // Save updated user
    const updatedUser = await user.save();

    // Respond with success message and updated user data
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//orders
 const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user.userId })
      .populate("products", "-photo")
      .populate({
        path: "buyer",
        select: "firstname lastname", // Ensure you are selecting firstname and lastname fields
      })

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
 const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate({
        path: "buyer",
        select: "firstname lastname", // Ensure you are selecting firstname and lastname fields
      })

      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
const deleteOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and delete the order
    const order = await orderModel.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Deleting Order",
      error,
    });
  }
};






export { registerUser, loginUser, getUserDataByToken,forgotPassword, resetPassword,updateProfileController,getOrdersController,getAllOrdersController,orderStatusController,deleteOrderController,getAllUsers};
