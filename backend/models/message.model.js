import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: false
    },
    sender: {
        type: String,
        required: true,
        enum: ["user", "bot"]
    },
    text: {
        type: String,
        required: false // Text is now optional if a file is sent
    },
    file: {
        url: String,
        name: String,
        fileType: String, // 'image', 'video', 'pdf', etc.
        size: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
