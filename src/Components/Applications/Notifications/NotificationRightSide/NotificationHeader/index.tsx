import NotificationsNavTab from "./NotificationsNavTab";
import React from "react";

interface NotificationHeaderProps {
    navId: string;
    setNavId: React.Dispatch<React.SetStateAction<string>>;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({navId, setNavId}) => {
    return (
        <div className="mail-header-wrapper">
            <div className="mail-header">
                <div className="form-check form-check-inline m-0">
                    <NotificationsNavTab navId={navId} setNavId={setNavId} />
                </div>
            </div>
        </div>
    );
};

export default NotificationHeader;