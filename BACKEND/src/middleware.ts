import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define userId as an optional property
    }
  }
}

dotenv.config();
const jwtSecret = process.env.JWT_PASSWORD as string;
export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        message: "you are not logged in",
      });
      return;
    }
  } catch (e) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
