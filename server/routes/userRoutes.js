import { clerkWebhooks } from "../controllers/userControllers.js"
import express from 'express'

const userRouter = express.Router()

userRouter.post('/webhooks',clerkWebhooks)


export default userRouter;