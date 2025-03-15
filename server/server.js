import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";

// Express initialization
const app = express();

// Database connection
connectDB();

// Middleware initialization
app.use(express.json()); // Default JSON parser for most routes
app.use(cors());

// Raw body parser for Clerk webhooks to ensure signature verification works
app.use("/api/user/webhooks", express.raw({ type: "application/json" }));

// API routes
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/user", userRouter);

// Port initialization
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
