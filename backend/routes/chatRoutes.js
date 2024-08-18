import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupChatValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, validateHandler } from "../lib/validator.js";
const router=express.Router();

router.use(isAuthenticatedUser);

router.post("/new",newGroupChatValidator(),validateHandler,newGroupChat);
router.get("/my",getMyChats);
router.get("/my/groups",getMyGroups);
router.put("/addmembers",addMemberValidator(),validateHandler,addMembers);
router.put("/removemember",removeMemberValidator(),validateHandler,removeMembers);
router.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup);
//sendAttachments
router.post("/messages",attachmentsMulter,sendAttachmentsValidator(),validateHandler,sendAttachments);
//getMessages
router.get("/message/:id",chatIdValidator(),validateHandler,getMessages);
//get chat details rename delete
router.route("/:id").get(chatIdValidator(),validateHandler,getChatDetails).put(renameGroupValidator(),validateHandler,renameGroup).delete(chatIdValidator(),validateHandler,deleteChat);


export default router;