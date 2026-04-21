import express from "express";
import { createConversation, getConversations, deleteConversation } from "../controllers/conversation.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createConversation);
router.get("/all", protect, getConversations);
router.delete("/delete/:id", protect, deleteConversation);

export default router;
