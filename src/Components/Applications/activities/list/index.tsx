import React, {useState} from "react";
import {Card, NavItem, Nav, NavLink, CardBody,Row} from "reactstrap";
import TabsContent from "@/Components/Applications/activities/list/TabsContent";

const Project = () => {

    const [basicTab, setBasicTab] = useState("1");

    return (
        <Row>
            <Card>
                <CardBody>
                    <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                        <NavItem>
                            <NavLink className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                                <i className="icofont icofont-files"></i>{"Activités non publiées"}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                                <i className="icofont icofont-ui-clip-board"></i>{"Activités publiées"}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabsContent basicTab={basicTab}/>
                </CardBody>
            </Card>
        </Row>
    )
}

export default Project;