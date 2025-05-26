import React, {useState} from "react";
import {Card, NavItem, Nav, NavLink, CardBody,} from "reactstrap";
import {publishedActivity, allActivities} from "@/Constant";
import TabsContent from "@/Components/Applications/projects/TabsContent";

const Project = () => {

    const [basicTab, setBasicTab] = useState("2");

    return (
        <Card>
            <CardBody>
                <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                    <NavItem>
                        <NavLink className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                            <i className="icofont icofont-files"></i>{allActivities}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                            <i className="icofont icofont-ui-clip-board"></i>{publishedActivity}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabsContent basicTab={basicTab}/>
            </CardBody>
<<<<<<< HEAD
        </Card>
    )
=======
        </Card>)
>>>>>>> develop
}

export default Project;