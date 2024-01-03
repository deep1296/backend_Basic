import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authorization = asyncHandler(async (req, _, next) => {
  
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request token is  not authorized");
    }
    // console.log("Token", token);
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    //console.log("Decoded token", decoded);

    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid User access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid User access token");
  }
});
