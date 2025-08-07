import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

// Express initialization
const app = express();

// Database connection with error handling
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// Middleware initialization
// app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173", // Frontend URL
      credentials: true, // Allow cookies and authentication headers
    })
  );

// API routes
app.get('/', (req, res) => res.send('API Working fine'));
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

// Port initialization
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
