import express from "express";
import { getUserProfile, login,registerUser } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router=express.Router();

router.get("/login",login);
router.post("/register",singleAvatar,registerUser);
router.get("/me",isAuthenticatedUser,getUserProfile)

export default router