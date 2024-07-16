import React, {useState} from "react";
import {Card, CardBody, Col, Nav, NavItem, NavLink} from "reactstrap";
import {BorderTabContent} from "./BorderTabContent";
import {Href} from "@/Constant";


const BorderTabs = () => {

    const [basicTab, setBasicTab] = useState("2");

    return (
        <Col>
            <Card>
                <CardBody>
                    <Nav tabs className="border-tab mb-4" id="bottom-tab">
                        <NavItem><NavLink href={Href} className={`nav-border txt-primary tab-primary pt-0 ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}><i
                            className="icofont icofont-book-alt"></i> {"Informations"}</NavLink></NavItem>
                        <NavItem><NavLink href={Href} className={`nav-border txt-primary tab-primary ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}><i
                            className="icofont icofont-file-image"></i>{"Image"}</NavLink></NavItem>
                    </Nav>
                    <BorderTabContent basicTab={basicTab}/>
                </CardBody>
            </Card>
        </Col>
    );
};

export default BorderTabs;
