import React, {useState} from "react";
import { Container, Row } from 'reactstrap';
import NotificationRightSide from "@/Components/Applications/Notifications/NotificationRightSide";
import NotificationSidebar from "@/Components/Applications/Notifications/NotificationSidebar";


const NotificationBoxContainer = () => {

    const [navId, setNavId]= useState("1");

    return (
        <Container fluid>
            <div className="email-wrap email-main-wrapper">
                <Row>
                    {/*<NotificationSidebar navId={navId} setNavId={setNavId} />*/}
                    <NotificationRightSide navId={navId}  />
                </Row>
            </div>
        </Container>
    );
    
}

export default NotificationBoxContainer;
