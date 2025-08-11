import express from 'express';
import { clerkWebhook, userCredits } from '../controllers/userControllers.js';
import authuser from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhook)
userRouter.get('/credits', authuser, userCredits)


export default userRouter;
