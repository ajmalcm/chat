import express from "express";
import { acceptFriendRequest, getAllNotifications, getMyFriends, getUserProfile, login,logoutUser,registerUser, searchUser, sendFriendRequest } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validator.js";

const router=express.Router();

router.post("/register",singleAvatar,registerValidator(),validateHandler,registerUser);
router.post("/login",loginValidator(),validateHandler,login);


router.use(isAuthenticatedUser);
//everyRoute after this will have this middleware applied

router.get("/me",getUserProfile)
router.delete("/logout",logoutUser);
router.get("/search",searchUser)
router.put("/sendrequest",sendRequestValidator(),validateHandler,sendFriendRequest);
router.put("/acceptrequest",acceptRequestValidator(),validateHandler,acceptFriendRequest);
router.get("/notifications",getAllNotifications)
router.get("/friends",getMyFriends);



export default router