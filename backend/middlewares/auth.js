import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModels.js';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = {
      userId: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access. User is not an admin.',
    });
  }
  next();
};
