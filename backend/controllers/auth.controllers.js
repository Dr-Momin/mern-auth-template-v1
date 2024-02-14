import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
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

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });
  if (!validUser) throw new ApiError(404, "User not Found.");

  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) throw new ApiError(401, "Wrong Credentials");

  const token = jwt.sign(
    {
      id: validUser._id,
      email: validUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_SECRET_EXPIRY },
  );

  const { password: hashedPassword, ...rest } = validUser._doc;

  res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json(new ApiResponse(200, rest, "Successful Login"));
});
