import { ImagePath, Send } from '@/Constant';
import { NotificationPropsType} from "@/Types/Notifications/NotificationType";
import React, { LegacyRef} from "react";
import { ChevronDown} from "react-feather";
import { Button} from "reactstrap";
import InboxOption from './InboxOption';
import UserFooter from './UserFooter';
import UserNotificationBody from './UserNotificationBody';

const InterviewNotificationBody = React.forwardRef(({handlerPrintData}:NotificationPropsType, ref:LegacyRef<HTMLDivElement> | undefined) => {

    return (
        <div ref={ref} >
            <div className="mail-body-wrapper">
                <div className="user-mail-wrapper">
                    <div className="user-title">
                        <div>
                            <div className="rounded-border">
                                <img className="img-fluid" src={`${ImagePath}/user/12.png`} alt="user"/>
                            </div>
                            <div className="dropdown-subtitle">
                                <p>Ronald Richards</p>
                            </div>
                        </div>
                    </div>
                    <UserNotificationBody />
                    <UserFooter />
                    <div className="send-btn">
                        <Button color="primary">{Send}<i className="fa fa-paper-plane" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
});

export default InterviewNotificationBody