import express from "express"
import { allChats, allMessages, allUsers, getDashboardStats } from "../controllers/adminController.js";
const router=express.Router();



router.get("/users",allUsers);
router.get("/chats",allChats);
router.get("/messages",allMessages);
router.get("/stats",getDashboardStats)


export default router;