import express from "express";
import { getUserProfile, login,logoutUser,registerUser } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router=express.Router();

router.get("/login",login);
router.post("/register",singleAvatar,registerUser);


//everyRoute after this will have this middleware applied
router.use(isAuthenticatedUser);

router.get("/me",getUserProfile)
router.delete("/logout",logoutUser);

export default router