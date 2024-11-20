import {Badge, Nav, NavItem, NavLink} from "reactstrap";
import React from "react";
import {useAppSelector} from "@/Redux/Hooks";
import {PhasesSidebar} from "@/Data/Application/Phases";
import SVG from "@/CommonComponent/SVG";
import {PhaseNavMenuProps} from "@/Types/Programs/PhasesType";

const PhaseNavMenu: React.FC<PhaseNavMenuProps> = ({navId, setNavId}) => {


    return(
        <Nav pills tabs className={'main-menu email-category border-0'}>
            {PhasesSidebar.map((phase, index) => (
                <NavItem key={index}>
                    <NavLink
                        className={navId === phase.id ? "active" : ""}
                        onClick={() => setNavId(phase.id)}
                    >
                        <i className="fa fa-road text-white"></i>
                        <div className={'text-white'}>
                            {phase.title}
                        </div>
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    )
}

export default PhaseNavMenu