import {Chats, UserListChat} from "@/Constant";
import {useState} from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ChatTabPane from "@/Components/Applications/chat/chat_room/LeftSideBar/ChatTabPane";
import ContactTabPane from "@/Components/Applications/chat/chat_room/LeftSideBar/ContactTabPane";


const ChatOptionTab = () => {
    const [activeTab, setActiveTab] = useState("1");

    return (
        <div className="advance-options">
            <Nav tabs className="border-tab" id="chat-options-tab">
                <NavItem><NavLink className={`${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")} id="chats-tab">{Chats}</NavLink></NavItem>
                {/*<NavItem><NavLink className={`${activeTab === "2" ? "active" : ""}`} onClick={() => setActiveTab("2")} id="contacts-tab">{UserListChat}</NavLink></NavItem>*/}
            </Nav>
            <TabContent activeTab={activeTab} id="chat-options-tabContent">
                <TabPane id="chats" tabId="1" className="text-center">
                    <ChatTabPane/>
                </TabPane>
                <TabPane id="contacts" tabId="2">
                    <ContactTabPane />
                </TabPane>
            </TabContent>
        </div>
    );
};
export default ChatOptionTab;