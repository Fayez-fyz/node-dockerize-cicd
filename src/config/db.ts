import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Destructure and validate environment variables
const { DB_HOST, DB_PASSWORD, DB_CLUSTER_NAME } = process.env;

if (!DB_HOST || !DB_PASSWORD || !DB_CLUSTER_NAME) {
  throw new Error("Missing required database environment variables");
}

// Establish MongoDB connection
export const connectDB = async (): Promise<void> => {
  try {
    const uri = `mongodb+srv://${DB_HOST}:${DB_PASSWORD}@${DB_CLUSTER_NAME}.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure code
  }
};
