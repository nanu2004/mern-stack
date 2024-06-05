import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModels.js';
import cookieParser from 'cookie-parser'; // Import cookie-parser middleware

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const VerifyToken = async (req, res, next) => {
  try {
    // Set up the cookie-parser middleware to parse cookies
    cookieParser();

    // Get the token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.decode(token); // Use jwt.decode instead of jwt.verify
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
