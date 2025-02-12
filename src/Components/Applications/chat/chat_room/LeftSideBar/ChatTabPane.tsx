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
                    <Button tag="a" color="transparent" className="badge-light-primary f-w-500">
                        <i className="fa fa-plus" />
                    </Button>
                </div>
            </div>
            <ChatUserProfile />
        </>
    );
};
export default ChatTabPane;