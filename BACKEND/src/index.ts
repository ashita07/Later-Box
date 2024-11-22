import express from "express";
// import jwt from "jsonwebtoken";
import { UserModel } from "./db";
// import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const Port = process.env.PORT;

// const usernameSchema = z
//   .string()
//   .min(2, "Username must be at least 2 characters long");
// const passwordSchema = z
//   .string()
//   .min(8, "Password must be at least 8 characters long");

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
      username: username,
      password: password,
    });
    res.status(200).json({
      message: "User signed Up",
    });
  } catch (e) {
    res.status(400).json({
      message: "failed to signup",
    });
  }
});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.post("/api/v1/link/share", (req, res) => {});

app.get("/api/v1/link/:sharelink", (req, res) => {});

app.listen(Port || 3000);
