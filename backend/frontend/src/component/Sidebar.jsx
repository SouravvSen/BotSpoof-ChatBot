import React, { useEffect, useState } from 'react';
import { FaPlus, FaMessage, FaTrash } from 'react-icons/fa6';
import axios from 'axios';
import toast from 'react-hot-toast';

const Sidebar = ({ onSelectConversation, currentConvId, onNewChat }) => {
    const [conversations, setConversations] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            fetchConversations();
        }
    }, [token, currentConvId]);

    const fetchConversations = async () => {
        try {
            const res = await axios.get("http://localhost:4002/conversation/v1/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConversations(res.data);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this chat?")) return;
        
        try {
            await axios.delete(`http://localhost:4002/conversation/v1/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Chat deleted");
            fetchConversations();
            if (currentConvId === id) {
                onNewChat();
            }
        } catch (error) {
            toast.error("Failed to delete chat");
        }
    };

    return (
        <div className="w-64 bg-[#171717] h-full flex flex-col border-r border-gray-800 transition-all duration-300 ease-in-out overflow-hidden">
            <div className="p-4">
                <button 
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors border border-gray-700"
                >
                    <FaPlus size={14} />
                    <span className="text-sm font-medium">New Chat</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    History
                </div>
                {!token ? (
                    <div className="px-4 py-3 text-sm text-gray-500 italic">
                        Login to see history
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 italic">
                        No recent chats
                    </div>
                ) : (
                    <div className="space-y-1">
                        {conversations.map((conv) => (
                            <div 
                                key={conv._id}
                                onClick={() => onSelectConversation(conv._id)}
                                className={`group flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer border border-transparent transition-all ${
                                    currentConvId === conv._id 
                                    ? "bg-gray-800 text-white border-gray-700 shadow-lg" 
                                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                                }`}
                            >
                                <div className="flex items-center space-x-3 truncate">
                                    <FaMessage size={14} className={currentConvId === conv._id ? "text-green-500" : "text-gray-600"} />
                                    <span className="text-sm truncate w-40">{conv.title}</span>
                                </div>
                                <FaTrash 
                                    size={12} 
                                    className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => handleDelete(e, conv._id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-800 bg-[#171717]">
                <div className="text-[10px] text-center text-gray-600 uppercase tracking-widest font-bold">
                    BotSpoof AI
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
