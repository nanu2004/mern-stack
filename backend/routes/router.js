import express from 'express';
import { registerUser, loginUser, getUserDataByToken, forgotPassword, resetPassword } from '../controllers/authControllers.js';
import { VerifyToken, isAdmin } from '../middlewares/auth.js'; // Import VerifyToken middleware
import { User } from '../models/userModels.js'; // Import User model

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for forgot password
router.post('/forgot-password', forgotPassword);

// Route for resetting password with token
router.post('/reset-password', resetPassword);

// Route for getting user data using token
router.get('/user', VerifyToken, isAdmin, getUserDataByToken); // Protected route

// Route for verifying user authentication status and returning user data
router.get("/user-auth", VerifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ 
            ok: true,
            user: {
                _id: user._id, 
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for verifying admin authentication status and returning admin data
router.get("/admin-auth", VerifyToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ 
            ok: true,
            admin: {
                _id: user._id, 
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router };
