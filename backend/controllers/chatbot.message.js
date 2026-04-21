import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import knowledgeBase from "../data/knowledgeBase.js";

export const chatbotMessage = async (req, res) => {
    try {
        const { text, conversationId } = req.body;
        const userId = req.user ? req.user._id : null;
        const file = req.file;

        if (!text?.trim() && !file) {
            return res.status(400).json({ error: "Message content or file is required" });
        }

        let currentConversationId = conversationId;
        const firstLine = text ? text.substring(0, 30) : (file ? "Sent an attachment" : "New Chat");

        // Handle Conversation grouping
        if (userId && !currentConversationId) {
            const conversation = await Conversation.create({
                userId,
                title: firstLine + (text && text.length > 30 ? "..." : ""),
                lastMessage: text || "Sent an attachment"
            });
            currentConversationId = conversation._id;
        } else if (userId && currentConversationId) {
            const conv = await Conversation.findById(currentConversationId);
            if (conv && conv.title === "New Chat") {
                await Conversation.findByIdAndUpdate(currentConversationId, {
                    title: firstLine + (text && text.length > 30 ? "..." : ""),
                    lastMessage: text || "Sent an attachment"
                });
            } else {
                await Conversation.findByIdAndUpdate(currentConversationId, {
                    lastMessage: text || "Sent an attachment"
                });
            }
        }

        let fileData = null;
        if (file) {
            fileData = {
                url: `/uploads/${file.filename}`,
                name: file.originalname,
                fileType: file.mimetype.startsWith('image') ? 'image' : 'file',
                size: file.size
            };
        }

        // Save User Message
        if (userId) {
            await Message.create({
                userId,
                conversationId: currentConversationId,
                sender: "user",
                text,
                file: fileData
            });
        }

        // Bot Logic - Search Knowledge Base
        let botResponseText = "Sorry, I don't have enough information about that yet. I'm still learning!";
        
        if (text) {
            const normalizedText = text.toLowerCase().trim();
            
            // Find best match in knowledge base
            const match = knowledgeBase.find(item => 
                item.keywords.some(keyword => normalizedText.includes(keyword))
            );

            if (match) {
                botResponseText = match.response;
            }
        } else if (file) {
            botResponseText = `I received your ${fileData.fileType}: ${fileData.name}. I'm currently unable to analyze file content, but I've saved it for you!`;
        }

        // Save Bot Response
        if (userId) {
            await Message.create({
                userId,
                conversationId: currentConversationId,
                sender: "bot",
                text: botResponseText
            });
        }

        return res.status(200).json({
            userMessage: text,
            userFile: fileData,
            botMessage: botResponseText,
            conversationId: currentConversationId
        });
    } catch (error) {
        console.error("Error in message Controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getChatMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id;

        const messages = await Message.find({ conversationId, userId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getChatMessages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getChatHistory = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json([]);
        }
        const userId = req.user._id;
        const messages = await Message.find({ userId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getChatHistory:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
