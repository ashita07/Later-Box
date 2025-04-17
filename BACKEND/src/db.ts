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
  salt: String,
});

const adminSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});
const contentTypes = ["image", "video", "article", "audio"];

const Types = mongoose.Schema.Types;

const TagsSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  // tags: [{ types: Types.ObjectId, ref: "Tag" }],
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    validate: async function (value: string) {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new TypeError("user does not exist");
      }
    },
  },
});

const SchemaLink = new Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["single", "whole"], required: true },
  contentId: { type: Types.ObjectId, ref: "Content", default: null },
});

export const UserModel = model("User", userSchema);
export const AdminModel = model("Admin", adminSchema);
export const ContentModel = model("Content", contentSchema);
export const TagModel = model("Tag", TagsSchema);
export const SchemaModel = model("ShareLink", SchemaLink);
