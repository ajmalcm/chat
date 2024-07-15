import express from "express";
import { login,registerUser } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";

const router=express.Router();

router.get("/login",login);
router.post("/register",singleAvatar,registerUser)

export default router