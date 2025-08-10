import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// App configuration
const port = process.env.PORT || 3000;
const app = express();

// connect to MongoDB
await connectDB();


// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.get('/', (req, res) => res.send('API working!'));
app.use('/api/user',userRouter)

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));



