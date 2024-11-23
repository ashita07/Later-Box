import express from "express";
// import jwt from "jsonwebtoken";
import { UserModel } from "./db";
import { z } from "zod";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

dotenv.config();
const Port = process.env.PORT;

const usernameSchema = z
  .string()
  .min(2, "Username must be at least 2 characters long");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    const username = usernameSchema.parse(req.body.username);
    const HashedPassword = await hashPassword(
      passwordSchema.parse(req.body.password)
    );

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(403).json({
        message: "user with this username already exists",
      });
    }

    await UserModel.create({
      username: username,
      password: HashedPassword,
    });
    res.status(200).json({
      message: "User signed Up",
    });
  } catch (e) {
    if (e instanceof z.ZodError)
      res.status(411).json({
        message: "Error in inputs",
        errors: e.errors,
      });
    return res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.post("/api/v1/link/share", (req, res) => {});

app.get("/api/v1/link/:sharelink", (req, res) => {});

app.listen(Port || 3000);
