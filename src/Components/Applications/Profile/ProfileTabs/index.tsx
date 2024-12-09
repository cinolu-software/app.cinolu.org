import React, {useState} from 'react'
import {CardBody, Nav, NavItem, NavLink} from "reactstrap";
import { Description, Href, MaterialStyleTab, Review, User } from "@/Constant";


const ProfileTabs = () => {

    const [basicTab, setBasicTab] = useState("1");

    return (
        <CardBody>
            <Nav tabs className="border-tab border-0 mb-0 nav-danger">
                <NavItem><NavLink href={Href} className={`nav-border pt-0 txt-danger nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}><i className="icofont icofont-man-in-glasses"></i>{User}</NavLink></NavItem>
                <NavItem><NavLink href={Href} className={`nav-border txt-danger nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}><i className="icofont icofont-file-document"></i>{Description}</NavLink></NavItem>
                <NavItem><NavLink href={Href} className={`nav-border txt-danger nav-danger ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")}><i className="icofont icofont-star"></i>{Review}</NavLink></NavItem>
            </Nav>
        </CardBody>
    )
}

export default ProfileTabs