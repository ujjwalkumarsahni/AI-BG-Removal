import express from 'express';
import { clerkWebhook } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhook)
// userRouter.get('/credits', authuser, userCredits)


export default userRouter;
