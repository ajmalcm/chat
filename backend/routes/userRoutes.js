import express from "express";
import { getUserProfile, login,logoutUser,registerUser, searchUser } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { loginValidator, registerValidator, validateHandler } from "../lib/validator.js";

const router=express.Router();

router.post("/register",singleAvatar,registerValidator(),validateHandler,registerUser);
router.get("/login",loginValidator(),validateHandler,login);


//everyRoute after this will have this middleware applied
router.use(isAuthenticatedUser);

router.get("/me",getUserProfile)
router.delete("/logout",logoutUser);
router.get("/search",searchUser)

export default router