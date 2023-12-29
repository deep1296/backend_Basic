import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: "ok",
  });
});

export { registerUser };
