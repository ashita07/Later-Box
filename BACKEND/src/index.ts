import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, SchemaModel } from "./db";
import { z } from "zod";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserMiddleware } from "./middleware";
import crypto from "crypto";

const hashPassword = async (password: string) => {
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: any | string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

dotenv.config();
const Port = process.env.PORT;
const jwt_password = process.env.JWT_PASSWORD;

if (!jwt_password) {
  throw new Error("JWT_Password is not defined in environment variables");
}

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
      return;
    }

    await UserModel.create({
      username: username,
      password: HashedPassword,
    });
    res.status(200).json({
      message: "User signed Up",
    });
    return;
  } catch (e) {
    if (e instanceof z.ZodError)
      res.status(411).json({
        message: "Error in inputs",
        errors: e.errors,
      });
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const username = usernameSchema.parse(req.body.username);
    const password = passwordSchema.parse(req.body.password);
    const existingUser = await UserModel.findOne({
      username,
    });
    if (!existingUser) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }
    const isPasswordValid = await comparePassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid username or password",
      });
      return;
    }
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        jwt_password
      );
      res.status(200).json({
        token,
      });
      return;
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        error: e.errors,
      });
      return;
    }
  }
});

const titleSchema = z
  .string()
  .min(2, "Username must be at least 2 characters long");

app.post("/api/v1/postContent", UserMiddleware, async (req, res) => {
  const title = titleSchema.parse(req.body.title);
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    title,
    userId: req.userId,
    // tags: [],
  });
  res.json({ message: "Content added" });
  return;
});

app.get("/api/v1/ViewContent", UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate({ path: "userId", select: "-password" });
  res.json({
    content,
  });
});

app.delete("/api/v1/deleteContent", UserMiddleware, async (req, res) => {
  try {
    const contentId = req.body.contentId;
    const deleteResult = await ContentModel.deleteMany({
      _id: contentId,
      userId: req.userId,
    });

    if (deleteResult.deletedCount === 0) {
      res.status(404).json({
        message: "No content found for specified user and content ID",
      });
      return;
    }
    res.json({
      message: "Deleted",
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/v1/link/share", UserMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;
    if (!contentId) {
      res.status(400).json({ message: "Content ID is required" });
      return;
    }
    const content = await ContentModel.findOne({
      _id: contentId,
      userId: req.userId,
    });
    if (!content) {
      res.status(404).json({ message: "Content not found or unauthorized" });
    }
    const hash = crypto.randomBytes(16).toString("hex");

    await SchemaModel.create({
      hash,
      userId: req.userId,
    });

    res.status(201).json({
      message: "Share link created successfully",
      shareLink: `${req.protocol}://${req.get("host")}/api/v1/link/${hash}`,
    });
  } catch (e) {
    console.error("Error createing share link:", e);
    res.status(500).json({ message: "Interet server error" });
  }
});

app.get("/api/v1/link/:sharelink", async (req, res) => {
  try {
    const { sharelink } = req.params;

    if (!sharelink) {
      res.status(400).json({
        message: "share link is required",
      });
      return;
    }

    const link = await SchemaModel.findOne({ hash: sharelink });
    if (!link) {
      res.status(404).json({ message: "invalid or expired link" });
      return;
    }
    const content = await ContentModel.findOne({
      userId: link.userId,
    });
    if (!content) {
      res.status(404).json({ message: "content not found" });
    }
    res.status(200).json({
      message: "content found successfully",
      content,
    });
  } catch (e) {
    console.log("error retrieving content:", e);
    res.status(500).json({ message: "internal server error" });
  }
});

app.listen(Port || 3000);
