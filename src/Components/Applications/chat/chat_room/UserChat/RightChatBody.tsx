import { useRef, useState, useEffect } from "react";
import { ImagePath } from "@/Constant";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import SendMessage from "@/Components/Applications/chat/chat_room/UserChat/SendMessage";
import { imageBaseUrl, socket } from "@/services/axios";
import { setMessage } from "@/Redux/Reducers/ChatSlice/ChatRoomSlice";

const RightChatBody = () => {
    const { messages } = useAppSelector(state => state.chat);
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                dispatch(setMessage([...messages, newMessage])); 
                scrollToBottom(); 
            });

            socket.on("userTyping", ({ name }) => {
                setTypingUser(name);
                scrollToBottom(); 
                setTimeout(() => setTypingUser(null), 4000); 
            });
        }

        return () => {
            if (socket) {
                socket.off("newMessage");
                socket.off("userTyping");
            }
        };
    }, [messages, dispatch]);

    useEffect(() => {
        scrollToBottom(); 
    }, [messages, typingUser]);



    return (
        <div className="right-sidebar-Chats">
            <div className="msger">
                <div className="msger-chat">
                    {messages && messages.length > 0 ? (
                        messages.map((message) => (
                            <div className={message.sender.id === user?.id ? `msg right-msg` : `msg left-msg`} key={message.id}>
                                <img 
                                    src={
                                        message.sender?.profile
                                            ? `${imageBaseUrl}/profiles/${message.sender.profile}`
                                            : message.sender?.google_image
                                                ? message.sender.google_image
                                                : `${ImagePath}/avtar/avatar.jpg`
                                    }
                                    className="rounded-circle img-30 h-auto" alt="user" 
                                />
                                <div className="msg-bubble mx-2">
                                    <div className="msg-info">
                                        <div className="msg-info-name">{message.sender.name}</div>
                                        <div className="msg-info-time">
                                            {
                                                new Date(message.created_at).toLocaleString("fr-FR", 
                                                    {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                            )}
                                        </div>
                                    </div>
                                    <div className="msg-text">{message.message}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <img className="w-100" src={`${ImagePath}/start-conversion.jpg`} alt="start conversion" />
                    )}
                    {typingUser && <div className="typing-indicator">{typingUser} est en train d'écrire...</div>}
                    <div ref={messagesEndRef} /> 
                </div>
                <SendMessage />
            </div>
        </div>
    );
};

export default RightChatBody;
