import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;

  // checking validation for empty input fields.
  // ************* Method 1 ***********
  // if (
  //   !userName.trim() ||
  //   !email.trim() ||
  //   !fullName.trim() ||
  //   !avtar.trim() ||
  //   !password.trim()
  // ) {
  // }

  //** New Way *
  if (
    [userName, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must not be empty");
  }

  // check if the user is already registered or not with the username or email
  // Pass the proprty which you need to check in object method 1
  //const user = await User.findOne({ userName, email });

  // We can aslo use the operators provided by express

  const existedUser = User.findOne({
    $or: [{ email, userName }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avtarLocalPath = req.files.avtar[0]?.path;
  if (!avtarLocalPath) throw new ApiError(400, "Avatar file is not available");

  const avtar = await uploadOnCloudinary(avtarLocalPath);

  if (!avtar) throw new ApiError(400, "Avatar file is not available");

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    fullName,
    password,
    avtar: avtar?.url || "example.jpg",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while uploading");

  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };

// get user details from frontend
// add validation rules
// check if user is already registered : valid through email and user name
// check the files (Images and videos);
// upload files to cloudanary
// Create user object and create entry in MongoDB
// Check if user is created or not
// Remove password and refresh token when sending the response
// if user is created then send the response
