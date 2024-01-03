import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;
  // get user details from frontend
  // add validation rules
  // check if user is already registered : valid through email and user name
  // check the files (Images and videos);
  // upload files to cloudanary
  // Create user object and create entry in MongoDB
  // Check if user is created or not
  // Remove password and refresh token when sending the response
  // if user is created then send the response

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

  const existedUser = await User.findOne({
    $or: [{ email, userName }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avtarLocalPath = req.files.avtar[0]?.path;

  // Second method to check if file is present or not it will show undefined if there is no file

  // let avtarLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.avtar) &&
  //   req.files.avtar.length > 0
  // ) {
  //   avtarLocalPath = req.files.avtar[0].path;
  // }

  // console.log(req);
  // console.log("Body", req.body);
  // console.log("This is files", req.files);

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

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(500, "Something went wrong");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // get data from req.body
  // check usname and email is there or not
  // find user
  // check if password is correct or not
  // if password is correct then generate the access token and refresh token
  // Send these tokens in form of cookies
  // Send the response

  const { userName, password, email } = req.body;
  if (!userName || !email) {
    throw new ApiError(404, "Username or email is required");
  }
  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 15,
  };
  res
    .status(202)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const regenerateAccessToken = asyncHandler(async (req, res) => {
  const incomingrefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingrefreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    if (!decodedToken) {
      throw new ApiError(400, "Invalid refresh token");
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(400, "Invalid refresh token");
    }

    if (incomingrefreshToken !== user?.refreshToken) {
      throw new ApiError(400, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 15,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Refresh token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid Refresh Token");
  }
});

export { registerUser, loginUser, logOutUser, regenerateAccessToken };
