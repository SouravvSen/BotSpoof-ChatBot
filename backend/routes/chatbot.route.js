import express from "express";
import { chatbotMessage, getChatHistory, getChatMessages } from "../controllers/chatbot.message.js";
import protect from "../middleware/auth.middleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/message", protect, upload.single('file'), chatbotMessage);
router.get("/history", protect, getChatHistory);
router.get("/conversation/:conversationId", protect, getChatMessages);

export default router;
