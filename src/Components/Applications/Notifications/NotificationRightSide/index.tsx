import {Card, Col, Nav, TabContent, TabPane, NavItem, NavLink} from "reactstrap";
import NotificationHeader from "@/Components/Applications/Notifications/NotificationRightSide/NotificationHeader";
import ComposeNotificationModal from "@/Components/Applications/Notifications/NotificationRightSide/ComposeNotificationModal";
import SentContent from "@/Components/Applications/Notifications/NotificationRightSide/SentContent";
import InboxContent from "@/Components/Applications/Notifications/NotificationRightSide/InboxContent";
import StarredContent from "@/Components/Applications/Notifications/NotificationRightSide/StarredContent";
import TrashContent from "@/Components/Applications/Notifications/NotificationRightSide/TrashContent";
import WorkContent from "@/Components/Applications/Notifications/NotificationRightSide/WorkContent";
import PrivateContent from "@/Components/Applications/Notifications/NotificationRightSide/PrivateContent";
import SupportContent from "@/Components/Applications/Notifications/NotificationRightSide/SupportContent";
import AddLabelModal from "@/Components/Applications/Notifications/NotificationRightSide/AddLabelModal";
import InterviewNotification from "@/Components/Applications/Notifications/NotificationRightSide/InterviewNotification";
import {useAppSelector} from "@/Redux/Hooks";
import {NotificationBoxNavContentType} from "@/Types/Notifications/NotificationType";
import React, {useState} from "react";
import DraftContent from "@/Components/Applications/Notifications/NotificationRightSide/DraftContent";
import {NotificationNavTabs} from "@/Data/Application/Notifications";
import SVG from '@/CommonComponent/SVG';
import {Href} from "@/Constant";


const NotificationRightSide: React.FC<NotificationBoxNavContentType> = () => {

    const {interviewNotification} = useAppSelector(state => state.notifications);
    const [navId, setNavId] = useState("1");

    return (
        <Col xxl="12" xl="12" className="box-col-12">
            <div className="email-right-aside">
                <Card className={`email-body email-list ${interviewNotification ? "hide" : "show"}`}>
                    <ComposeNotificationModal />
                    <NotificationHeader navId={navId} setNavId={setNavId} />
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                       <InboxContent />
                       <SentContent />
                       <StarredContent />
                       <DraftContent />
                       <TrashContent />
                       <WorkContent />
                       <PrivateContent />
                       <SupportContent />
                       <AddLabelModal />
                    </TabContent> 
                </Card>
                <InterviewNotification />
            </div>
        </Col>
    );
}

export default NotificationRightSide;

