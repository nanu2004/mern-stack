import { User } from '../models/userModels.js';
import bcrypt from 'bcrypt'; // Import bcrypt module
import jwt from 'jsonwebtoken'; // Import jsonwebtoken module
import dotenv from 'dotenv'; // Import dotenv package to load environment variables
import cookieParser from 'cookie-parser'; // Im
dotenv.config(); // Load environment variables from .env file

// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Use JWT_SECRET_KEY

// Replace 'your_secret_key' with your actual secret key

// Controller for user registration (signup)
const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate input

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Generate a salt and hash the password

    // Create new user with hashed password
    const user = new User({ firstname, lastname, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '10h' }); // Token expires in 1 hour

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration


    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration



    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUserAndGetData = async (req, res) => {
  try {
    const { email, password } = req.query; // Assuming email and password are sent as query parameters

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to return user data for GET request
const getUserRegistrationPage = async (req, res) => {
  try {
    // Fetch user data from the database
    const users = await User.find();

    // Return the user data in JSON format
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, getUserRegistrationPage, loginUserAndGetData };
