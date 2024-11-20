import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.post("./api/vi/signup", (req, res) => {});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.post("/api/v1/link/share", (req, res) => {});

app.get("/api/v1/link/:sharelink", (req, res) => {});
