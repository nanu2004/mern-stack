import express from 'express';
import { registerUser, loginUser, getUserDataByToken } from '../controllers/authControllers.js';
import { VerifyToken } from '../middlewares/auth.js'; // Import VerifyToken middleware

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user data using token
router.get('/user', VerifyToken, getUserDataByToken); // Protected route

// Route for refreshing access token
//router.post('/refresh', VerifyToken, refreshAccessToken); // Verify token before refreshing

// Route for user logout
//router.post('/logout', VerifyToken, logoutUser); // Protected route

export  {router};
