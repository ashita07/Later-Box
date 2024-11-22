import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.Mongodb_url;

if (!MONGO_URL) {
  throw new Error("MONGO_URI is not defined in the .env file");
}

// Connect to MongoDB
async function connectToDatabase(MONGO_URL: string) {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
}

connectToDatabase(MONGO_URL);

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const adminSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", userSchema);
export const AdminModel = model("Admin", adminSchema);
