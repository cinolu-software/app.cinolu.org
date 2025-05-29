import React, { useState } from "react";
import { Card, NavItem, Nav, NavLink, CardBody } from "reactstrap";
import { publishedEvents, allEvents } from "@/Constant";
import TabsContent from "@/Components/Applications/events/TabsContent";


const Events = () => {

    const [basicTab, setBasicTab] = useState("1");

    return (
        <Card>
            <CardBody>
                <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                    <NavItem>
                        <NavLink className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                            <i className="icofont icofont-files"></i>{allEvents}
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                            <i className="icofont icofont-ui-clip-board"></i>{publishedEvents}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabsContent basicTab={basicTab}/>
            </CardBody>
        </Card>
    )
}

export default Events
