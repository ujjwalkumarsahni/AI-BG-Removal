import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// Express initialization
const app = express();

// Database connection with error handling
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// Middleware initialization
app.use('/api/user/webhooks', express.raw({ type: 'application/json' })); // Raw body for webhooks
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
}));

// API routes
app.get('/', (req, res) => res.send('API Working'));
app.use('/api/user', userRouter);

// Port initialization
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
