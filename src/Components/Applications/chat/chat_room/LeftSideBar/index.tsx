import React from "react";
import {Card, Col} from "reactstrap";
import ChatOptionTab from "./ChatOptionTab";

const LeftSideBar = () => {


    return (
        <Col xxl="3" xl="4" md="5" className="box-col-5">
            <Card className="left-sidebar-wrapper">
                <ChatOptionTab />
            </Card>
        </Col>
    );
};

export default LeftSideBar