import express from 'express';
import { clerkWebhook } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhook)


export default userRouter;
