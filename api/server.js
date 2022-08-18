import express from "express";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
