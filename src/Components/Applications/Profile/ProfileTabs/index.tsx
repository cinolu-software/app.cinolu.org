import React, {useState} from 'react'
import {CardBody, Nav, NavItem, NavLink} from "reactstrap";
import { Description, Href, MaterialStyleTab, Review, userProfileBasicInfo, userProfileSecurity, userProfilePersonalInfo } from "@/Constant";
import TabsContent from "@/Components/Applications/Profile/ProfileTabs/TabsContent";


const ProfileTabs = () => {

    const [basicTab, setBasicTab] = useState("1");

    return (
        <CardBody>
            <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                <NavItem>
                    <NavLink href={Href} className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                        <i className="icofont icofont-info-square"></i>{userProfileBasicInfo}
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href={Href} className={`nav-border pt-0 nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                        <i className="icofont icofont-user-alt-3"></i>{userProfilePersonalInfo}
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href={Href} className={`nav-border nav-danger ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")}>
                        <i className="icofont icofont-ui-lock"></i>{userProfileSecurity}
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href={Href} className={`nav-border nav-danger ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("4")}>
                        <i className="icofont icofont-ui-lock"></i>{userProfileSecurity}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabsContent basicTab={basicTab}/>
        </CardBody>
    )
}

export default ProfileTabs