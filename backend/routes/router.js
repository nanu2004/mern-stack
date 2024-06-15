import express from 'express';
import { registerUser, loginUser, getUserDataByToken } from '../controllers/authControllers.js';
import { VerifyToken , isAdmin } from '../middlewares/auth.js'; // Import VerifyToken middleware

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user data using token
router.get('/user', VerifyToken, isAdmin, getUserDataByToken); // Protected route
router.get("/user-auth",VerifyToken, (req,res) => {
    res.status(200).send({ ok:true});
});



export  {router};
