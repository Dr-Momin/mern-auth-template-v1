import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  if (!newUser)
    throw new ApiError(400, "Something went wrong While registering User.");
  await newUser.save();

  return res
    .status(201)
    .json(new ApiResponse(200, newUser, "User Registered Successfully"));
});
