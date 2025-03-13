import {RecentChats} from "@/Constant";
import React from "react";
import {Button} from "reactstrap";
import ChatUserProfile from "@/Components/Applications/chat/chat_room/LeftSideBar/ChatUserProfile";

const ChatTabPane = () => {
    return (
        <>
            <div className="common-space">
                <p>{RecentChats}</p>
                <div className="header-top">
                </div>
            </div>
            <ChatUserProfile />
        </>
    );
};
export default ChatTabPane;