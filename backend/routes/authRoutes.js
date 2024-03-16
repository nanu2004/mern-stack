import express from 'express';
import { registerUser, loginUser, getUserRegistrationPage, loginUserAndGetData } from '../controllers/authControllers.js';
import { VerifyToken } from '../middlewares/auth.js'; // Import VerifyToken middleware
import cookieParser from 'cookie-parser'; // Import cookie-parser package

const authRouter = express.Router();

// POST route for user registration
authRouter.post('/register', registerUser);

// POST route for user login
authRouter.post('/login', loginUser);

// GET route for getting user data (requires authentication)
authRouter.get('/users', cookieParser(), VerifyToken, getUserRegistrationPage); // Apply cookieParser middleware before VerifyToken

// GET route for user login and data retrieval (requires authentication)
authRouter.get('/login-user-data', cookieParser(), VerifyToken, loginUserAndGetData); // Apply cookieParser middleware before VerifyToken

export { authRouter };
