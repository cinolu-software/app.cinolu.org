import React, {useState} from "react";
import { Container, Row } from 'reactstrap';
import NotificationRightSide from "@/Components/Applications/Notifications/NotificationRightSide";


const NotificationBoxContainer = () => {

    const [navId, setNavId]= useState("1");

    return (
        <Container fluid>
            <div className="email-wrap email-main-wrapper">
                <Row>
                    <NotificationRightSide navId={navId}  />
                </Row>
            </div>
        </Container>
    );
    
}

export default NotificationBoxContainer;
