import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router=express.Router();

router.use(isAuthenticatedUser);

export default router;