import express from 'express';
import { clerkWebhook, paymentRazorpay, userCredits, verifyRazorpay } from '../controllers/userControllers.js';
import authuser from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhook)
userRouter.get('/credits', authuser, userCredits)
userRouter.post('/pay-razor', authuser, paymentRazorpay)
userRouter.post('/verify-razor', authuser, verifyRazorpay)


export default userRouter;
