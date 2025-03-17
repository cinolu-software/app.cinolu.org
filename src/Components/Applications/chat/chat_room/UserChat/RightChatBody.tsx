import {ImagePath} from "@/Constant";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import SendMessage from "@/Components/Applications/chat/chat_room/UserChat/SendMessage";
import {AllMemberType, ChatsTypes} from "@/Types/ChatType";
import{useRef, useState, useEffect} from "react";
import { imageBaseUrl } from "@/services/axios";


const RightChatBody = () => {

    const {messages} = useAppSelector(state=>state.chat)


    return (

        <div className="right-sidebar-Chats">
            <div className="msger">
                <div className="msger-chat">
                        {
                            messages && 
                                messages.length > 0 ? 
                                    messages.map((message) =>{
                                        return (
                                            <div className={`msg left-msg`}>
                                                <img 

                                                    src={
                                                        // message.sender?.profile
                                                            // ? `${imageBaseUrl}/profiles/${message.sender.profile}`
                                                            // : message.sender?.google_image
                                                            //     ? message.sender.google_image
                                                            //     : 
                                                                `${ImagePath}/avtar/avatar.jpg`
                                                    }

                                                    className="rounded-circle img-30 h-auto" alt="user" 
                                                />
                                                <div className="msg-bubble mx-2">
                                                    <div className="msg-info">
                                                        <div className="msg-info-name">{message.sender.name}</div>
                                                        <div className="msg-info-time">{message.created_at}</div>
                                                    </div>
                                                    <div className="msg-text">{message.message}</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                ): (
                                    <img className="w-100" src={`${ImagePath}/start-conversion.jpg`} alt="start conversion" />
                                )
                        }
                </div>
                <SendMessage />
            </div>
        </div>

    );
};

export default RightChatBody;
