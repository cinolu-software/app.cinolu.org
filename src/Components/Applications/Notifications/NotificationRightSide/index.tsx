import {Card, Col, TabContent} from "reactstrap";
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
import { NotificationBoxNavContentType} from "@/Types/Notifications/NotificationType";
import React from "react";
import DraftContent from "@/Components/Applications/Notifications/NotificationRightSide/DraftContent";


const NotificationRightSide: React.FC<NotificationBoxNavContentType> = ({ navId }) => {

    const { interviewNotification } = useAppSelector(state => state.notifications);

    return (
        <Col xxl="9" xl="8" className="box-col-12">
            <div className="email-right-aside">
                <Card className={`email-body email-list ${interviewNotification ? "hide" : "show"}`}>
                    <ComposeNotificationModal />
                    <NotificationHeader />
                    <TabContent activeTab={navId} id="email-pills-tabContent">
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

