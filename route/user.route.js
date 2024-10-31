import express from "express";
import { login, signup } from "../controller/user.controller.js";
import { getUserProfile, updateUserProfile } from '../controller/user.controller.js'; 
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;