import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import todoRoutes from "./routes/todo.route";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app: Application = express();

// Database connection
connectDB();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors({ origin: "*" })); // Allow all CORS requests (consider restricting in production)

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Dev is running" });
});

// Routes
app.use("/api", todoRoutes);

// Start the server
const port: number = parseInt(process.env.PORT || "5000", 10);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
