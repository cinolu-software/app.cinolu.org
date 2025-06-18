import React from "react";
import {EvenementVerticalData} from "@/Data/Application/evenement";
import { NavComponentProp } from "@/Types/ActivitiesTypes";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavComponent : React.FC<NavComponentProp> = ({callbackActive, activeTab}) => {

    const handleTab = (id: number | undefined) => {
        if (id !== undefined) callbackActive(id);
    };

    return (
        <Nav className="nav-pills horizontal-options">
            {
                EvenementVerticalData.map((data, index) => (
                    <NavItem key={index}>
                        <NavLink className={`${activeTab === index + 1 ? "active" : ""}`} onClick={() => handleTab(data.activeTab)}>
                            <div className="horizontal-wizard">
                                <div className="stroke-icon-wizard">
                                    <span>{index + 1}</span>
                                </div>
                                <div className="horizontal-wizard-content business-wizard">
                                    <h6>{data.title}</h6>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    )
}

export default NavComponent;