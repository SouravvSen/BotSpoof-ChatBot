import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversation = await Conversation.create({
            userId,
            title: "New Chat"
        });
        res.status(201).json(conversation);
    } catch (error) {
        console.error("Error in createConversation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({ userId }).sort({ updatedAt: -1 });
        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error in getConversations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findOne({ _id: id, userId });
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        await Message.deleteMany({ conversationId: id });
        await Conversation.findByIdAndDelete(id);

        res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        console.error("Error in deleteConversation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
