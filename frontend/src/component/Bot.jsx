 import axios from 'axios'
 import React, { useState, useEffect, useRef } from 'react'
 import { FaUserCircle } from 'react-icons/fa'
 import { FaCamera, FaImage, FaPaperclip, FaXmark, FaFileLines } from 'react-icons/fa6'
 import { useNavigate } from 'react-router-dom'
 import toast from 'react-hot-toast'
 import Sidebar from './Sidebar'

function Bot() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [Loader, setLoader] = useState(false)
    const [user, setUser] = useState(null)
    const [currentConvId, setCurrentConvId] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const navigate = useNavigate()
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)
    const imageInputRef = useRef(null)
    const cameraInputRef = useRef(null)

    const handleFileSelect = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => setFilePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null);
        }
    }

    const clearSelectedFile = () => {
        setSelectedFile(null);
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (imageInputRef.current) imageInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
    }

    const fetchConversationMessages = async (convId) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        try {
            setLoader(true);
            const res = await axios.get(`http://localhost:4002/bot/v1/conversation/${convId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setMessages(res.data.map(msg => ({
                    text: msg.text,
                    sender: msg.sender,
                    file: msg.file
                })));
            }
        } catch (error) {
            console.log("Error fetching conversation messages:", error);
            toast.error("Failed to load chat history");
        } finally {
            setLoader(false);
        }
    }

    const handleSelectConversation = (convId) => {
        setCurrentConvId(convId);
        fetchConversationMessages(convId);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setMessages([]);
        setCurrentConvId(null);
        setSelectedFile(null);
        setFilePreview(null);
        toast.success('Logged out successfully');
    }

    const handleProfileClick = () => {
        if (user) {
            if (window.confirm("Do you want to logout?")) {
                handleLogout();
            }
        } else {
            navigate('/login');
        }
    }

    const handleNewChat = () => {
        setMessages([]);
        setCurrentConvId(null);
        setSelectedFile(null);
        setFilePreview(null);
        toast.success('Starting a new chat');
    }

    const handelSendMessage = async () => {
        const token = localStorage.getItem('token');
        
        if(!input.trim() && !selectedFile) return;
        setLoader(true);

        try {
            const formData = new FormData();
            formData.append('text', input);
            if (currentConvId) formData.append('conversationId', currentConvId);
            if (selectedFile) formData.append('file', selectedFile);

            const config = {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            };

            const res = await axios.post("http://localhost:4002/bot/v1/message", 
                formData,
                config
            );
        
            if(res.status === 200){
                setMessages(prev => [...prev, 
                    {text: res.data.userMessage, sender: "user", file: res.data.userFile}, 
                    {text: res.data.botMessage, sender: "bot"}
                ]);
                if (res.data.conversationId && !currentConvId) {
                    setCurrentConvId(res.data.conversationId);
                }
                clearSelectedFile();
            }
        } catch (error) {
            console.log("Error sending message:", error);
            toast.error(error.response?.data?.error || "Failed to send message");
        }
        setInput("");
        setLoader(false);
    }

    const handelKeyPress = (e) => {
        if(e.key === 'Enter') handelSendMessage();
    }

  return (
    <div className='flex h-screen bg-[#0d0d0d] text-white overflow-hidden'>
        {/* Sidebar */}
        <Sidebar 
            onSelectConversation={handleSelectConversation} 
            currentConvId={currentConvId} 
            onNewChat={handleNewChat} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
            <header className="absolute top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d]/80 backdrop-blur-md z-10">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <h1 className="text-lg font-bold">BotSpoof</h1>
                    <div className="flex items-center space-x-4">
                        {user && <span className="text-sm text-gray-400">Hi, {user.username}</span>}
                        <div 
                            onClick={handleProfileClick}
                            className="cursor-pointer hover:text-green-500 transition-colors flex items-center space-x-2"
                            title={user ? "Logout" : "Login"}
                        >
                            <FaUserCircle size={30} />
                            {!user && <span className="text-sm font-medium">Login</span>}
                        </div>
                    </div>
                </div>
            </header>

            {/* chat section */}
            <main className="flex-1 overflow-y-auto pt-20 pb-24 flex flex-col items-center">
                <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-4 py-4">
                    {messages.length === 0 ? (
                        <div className="h-[60vh] flex items-center justify-center">
                            <div className="text-center text-gray-400 text-lg">
                                👋 Hi, I'm{" "}
                                <span className="text-green-500 font-semibold">BotSpoof</span>. How can I help you today?
                            </div>
                        </div>
                    ) : (       
                        <>
                        {messages.map((msg, idx) => (
                            <div 
                        key={idx}
                        className={`px-4 py-2 rounded-xl max-w-[75%] break-words flex flex-col space-y-2 ${
                            msg.sender === "user"
                            ? "bg-blue-600 text-white self-end shadow-md"
                            : "bg-gray-800 text-gray-100 self-start border border-gray-700 shadow-md"
                        }`}
                       >
                        {msg.file && (
                            <div className="mt-1">
                                {msg.file.fileType === 'image' ? (
                                    <img 
                                        src={`http://localhost:4002${msg.file.url}`} 
                                        alt={msg.file.name} 
                                        className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => window.open(`http://localhost:4002${msg.file.url}`, '_blank')}
                                    />
                                ) : (
                                    <a 
                                        href={`http://localhost:4002${msg.file.url}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 bg-gray-900/50 p-2 rounded-lg hover:bg-gray-900 transition-colors border border-gray-700"
                                    >
                                        <FaFileLines size={20} className="text-blue-400" />
                                        <span className="text-xs truncate max-w-[150px]">{msg.file.name}</span>
                                    </a>
                                )}
                            </div>
                        )}
                        {msg.text && <span>{msg.text}</span>}
                       </div>
                        ))}

                        {Loader && (
                            <div className="bg-gray-800/50 text-gray-400 px-4 py-2 rounded-xl max-w-[60%] self-start border border-gray-700 animate-pulse">
                                Bot is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                        </>
                    )}
                 </div>
            </main>

            {/* input & footer */}
            <footer className="absolute bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d]/80 backdrop-blur-md z-10">
                <div className="max-w-4xl mx-auto flex flex-col px-4 py-4 space-y-3">
                    {/* File Preview */}
                    {selectedFile && (
                        <div className="flex items-center space-x-3 bg-gray-900 p-2 rounded-xl border border-gray-700 w-fit max-w-full">
                            {filePreview ? (
                                <img src={filePreview} alt="preview" className="h-12 w-12 object-cover rounded-lg" />
                            ) : (
                                <div className="h-12 w-12 bg-gray-800 flex items-center justify-center rounded-lg">
                                    <FaFileLines size={20} className="text-blue-400" />
                                </div>
                            )}
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-gray-300 truncate max-w-[150px]">{selectedFile.name}</span>
                                <span className="text-[10px] text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <button onClick={clearSelectedFile} className="p-1 hover:text-red-500 text-gray-500 transition-colors">
                                <FaXmark size={18} />
                            </button>
                        </div>
                    )}

                    <div className="w-full flex items-center space-x-2 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-2 shadow-2xl focus-within:border-gray-500 transition-all">
                        {/* Hidden Inputs */}
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e, 'file')} className="hidden" />
                        <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileSelect(e, 'image')} className="hidden" />
                        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={(e) => handleFileSelect(e, 'camera')} className="hidden" />

                        {/* Upload Icons */}
                        <div className="flex items-center space-x-1 border-r border-gray-800 pr-2">
                            <button 
                                onClick={() => cameraInputRef.current.click()}
                                className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                title="Camera"
                            >
                                <FaCamera size={18} />
                            </button>
                            <button 
                                onClick={() => imageInputRef.current.click()}
                                className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                title="Photos"
                            >
                                <FaImage size={18} />
                            </button>
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                                title="Files"
                            >
                                <FaPaperclip size={18} />
                            </button>
                        </div>

                        <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 px-2 text-sm"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handelKeyPress}
                        />
                        <button
                        onClick={handelSendMessage}
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white font-medium transition-all active:scale-95 disabled:opacity-50"
                        disabled={(!input.trim() && !selectedFile) || Loader}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    </div>
  )
}

export default Bot
