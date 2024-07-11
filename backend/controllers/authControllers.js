import { User } from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 import  dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Controller for user registration (signup)
const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashedPassword, role }); // Include role here
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






export { registerUser, loginUser, getUserDataByToken,forgotPassword, resetPassword };
