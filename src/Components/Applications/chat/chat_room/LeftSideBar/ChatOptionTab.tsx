import {Chats} from "@/Constant";
import {useState} from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ChatTabPane from "@/Components/Applications/chat/chat_room/LeftSideBar/ChatTabPane";


const ChatOptionTab = () => {
    
    const [activeTab, setActiveTab] = useState("1");

    return (
        <div className="advance-options">
            <Nav tabs className="border-tab" id="chat-options-tab">
                <NavItem><NavLink className={`${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")} id="chats-tab">{Chats}</NavLink></NavItem>
            </Nav>
            <TabContent activeTab={activeTab} id="chat-options-tabContent">
                <TabPane id="chats" tabId="1" className="text-center">
                    <ChatTabPane/>
                </TabPane>
            </TabContent>
        </div>
    );
};
export default ChatOptionTab;