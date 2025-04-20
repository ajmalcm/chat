import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { User } from "../models/userModel.js";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;
const isAuthenticatedUser = (req, res, next) => {
  const { realtime_accessToken } = req.cookies;

  if (!realtime_accessToken) {
    return next(new ErrorHandler("Please Login to access this resource.", 401));
  }

  const decodedData = jwt.verify(realtime_accessToken, jwt_secret);
  req.user = decodedData._id;
  next();
};

const adminOnly = (req, res, next) => {
  const { realtime_admin_accessToken } = req.cookies;

  if (!realtime_admin_accessToken) {
    return next(new ErrorHandler("Only admin can access this route", 401));
  }

  const secretKey = jwt.verify(realtime_admin_accessToken, jwt_secret);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) {
    return next(new ErrorHandler("Only admin can access this route", 401));
  }

  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const { realtime_accessToken } = socket.request.cookies;

    if (!realtime_accessToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(
      realtime_accessToken,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedData._id);
    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

export { isAuthenticatedUser, adminOnly, socketAuthenticator };
