import {TypeMessageHere} from "@/Constant";
import ChatDropMenu from "@/Components/Applications/chat/chat_room/UserChat/ChatDropMenu";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FormEvent, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import {socket} from "@/services/axios";



const SendMessage = () => {

    const [messageInput, setMessageInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const {user} = useAppSelector(state=>state.auth)


    const addEmoji = (emoji: string) => {
        const text = `${messageInput}${emoji}`;
        setShowEmojiPicker(false);
        setMessageInput(text);
    };

    const handleMessageChange = (message: string) => {
        setMessageInput(message);
        
        if (socket && user) {
            socket.emit("typing-message", { name: user.name });
        }
    };
    
    



    const handleSubmit = () => {

        if(!messageInput.trim()) return;

        const messageData = {
            message: messageInput,
            sender: user?.id,
            reply_to: null,
        }

        if(socket){
            socket.emit("send-message", messageData)
        }

        setMessageInput('');
    }



    return (

        <Form
            className="msger-inputarea py-0"
        >
            <ChatDropMenu />
            <Input className="msger-input two uk-textarea shadow-none" type="text" placeholder={TypeMessageHere} value={messageInput} onChange={(e) => handleMessageChange(e.target.value)} />
            <div className="open-emoji">
                {showEmojiPicker ? (<Picker data={data} onEmojiSelect={(e: { native: string; }) => { addEmoji(e.native)}}/>) : null}
            </div>
            <div className="smiley-box">
                <div className="picker second-btn uk-button px-1" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
            </div>
            <Button
                color="primary"
                className="msger-send-btn"
                onClick={(e)=>handleSubmit()}
            >
                    <i className="fa fa-location-arrow" />
            </Button>
        </Form>
        
    );
};

export default SendMessage;