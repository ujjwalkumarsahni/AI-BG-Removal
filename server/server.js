import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';

// Express initialization
const app = express();

// Database connection with error handling
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// Middleware initialization
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173", // Frontend URL
      credentials: true, // Allow cookies and authentication headers
    })
  );

// API routes
app.get('/', (req, res) => res.send('API Working'));
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

// Port initialization
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
