import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middlewares/multer.js";
const router=express.Router();

router.use(isAuthenticatedUser);

router.post("/new",newGroupChat);
router.get("/my",getMyChats);
router.get("/my/groups",getMyGroups);
router.put("/addmembers",addMembers);
router.put("/removemember",removeMembers);
router.delete("/leave/:id",leaveGroup);
//sendAttachments
router.post("/messages",attachmentsMulter,sendAttachments);
//getMessages
router.get("/message/:id",getMessages);
//get chat details rename delete
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);


export default router;