import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModels.js';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const VerifyToken = async (req, res, next) => {
  try {
    // Get the token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY); // Use jwt.verify to validate the token
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = decoded; // Set req.user to the decoded token object

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware to check if the user has admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId); // Assuming `userId` is the correct field in the decoded token
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (user.role === 0) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access. User is not an admin.',
      });
    }
    // If the user is an admin, proceed to the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in isAdmin middleware',
      error,
    });
  }
};
