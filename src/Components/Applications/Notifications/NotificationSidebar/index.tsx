import { useState } from 'react';
import { Button, Col} from "reactstrap";
import {EmailFilter, Href} from "@/Constant";
import NotificationNavMenu from './NotificationLeftSidebar';
import { NotificationBoxNavType } from "@/Types/Notifications/NotificationType";
import React from "react";

const NotificationSidebar: React.FC<NotificationBoxNavType> = ({ navId, setNavId }) => {

    const [open, setOpen] = useState(false);

    return(
        <Col xxl={'3'} xl={'4'} className={'box-col-12'}>
            <div className={'md-sidebar'}>
                <Button color={'primary'} className={'md-sidebar-toggle'} href={Href} onClick={()=>setOpen(!open)}>
                    {EmailFilter}
                </Button>
                <div className={`md-sidebar-aside job-left-aside custom-scrollbar ${open ? "open" : ""}`}>
                    <NotificationNavMenu navId={navId} setNavId={setNavId} />
                </div>
            </div>
        </Col>
    )
}
export default NotificationSidebar