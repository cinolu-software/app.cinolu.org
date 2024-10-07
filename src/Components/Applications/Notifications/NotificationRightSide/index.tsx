import React, {useState} from "react";
import {Card, Col, Nav, TabContent, TabPane, NavItem, NavLink} from "reactstrap";
import NotificationHeader from "@/Components/Applications/Notifications/NotificationRightSide/NotificationHeader";
import ComposeNotificationModal from "@/Components/Applications/Notifications/NotificationRightSide/ComposeNotificationModal";
import SentContent from "@/Components/Applications/Notifications/NotificationRightSide/SentContent";
import InboxContent from "@/Components/Applications/Notifications/NotificationRightSide/InboxContent";
import StarredContent from "@/Components/Applications/Notifications/NotificationRightSide/StarredContent";
import InterviewNotification from "@/Components/Applications/Notifications/NotificationRightSide/InterviewNotification";
import {useAppSelector} from "@/Redux/Hooks";
import {NotificationBoxNavContentType} from "@/Types/Notifications/NotificationType";


const NotificationRightSide: React.FC<NotificationBoxNavContentType> = () => {

    const {interviewNotification} = useAppSelector(state => state.notifications);
    const [navId, setNavId] = useState("1");

    return (
        <Col xxl="12" xl="12" className="box-col-12">
            <div className="email-right-aside">
                <Card className={`email-body email-list ${interviewNotification ? "hide" : "show"}`}>
                    <ComposeNotificationModal/>
                    <NotificationHeader navId={navId} setNavId={setNavId} />
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                       <InboxContent />
                       {/*<SentContent />*/}
                       {/*<StarredContent/>*/}
                    </TabContent> 
                </Card>
                <InterviewNotification />
            </div>
        </Col>
    );

}

export default NotificationRightSide;

