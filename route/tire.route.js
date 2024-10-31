import express from "express";
import { getTire } from "../controller/tire.controller.js";

const router = express.Router();

router.get("/", getTire);

export default router;