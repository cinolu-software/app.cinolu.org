import React, {useState} from 'react';
import { Nav, NavItem, NavLink } from "reactstrap";
import {PhasesNavTabs} from "@/Data/Application/Phases";
import SVG from "@/CommonComponent/SVG";

const RightSideNavTab = () => {

    const [navId, setNavId] = useState('pills-important-tab');

    return (
        <Nav className="email-tabs" id="email-content-tab">
            {PhasesNavTabs.map((data, i) => (
                <NavItem key={i}>
                    <NavLink className={navId === data.id ? "active" : ""} id={data.id} onClick={()=>setNavId(data.id)} >
                        <SVG className="stroke-icon" iconId={data.icon} />
                        <span>{data.title} </span>
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    )
}
export default RightSideNavTab
