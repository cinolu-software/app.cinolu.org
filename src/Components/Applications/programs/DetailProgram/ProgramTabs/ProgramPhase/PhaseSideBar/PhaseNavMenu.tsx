import {Badge, Nav, NavItem, NavLink} from "reactstrap";
import React, {useEffect} from "react";
import {PhasesSidebar} from "@/Data/Application/Phases";
import SVG from "@/CommonComponent/SVG";
import {PhaseNavMenuProps} from "@/Types/Programs/PhasesType";
import { fetchProgramPhase } from "@/Redux/Reducers/programsSlice/ProgramPhaseSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

const PhaseNavMenu: React.FC<PhaseNavMenuProps> = ({navId, setNavId}) => {

    const dispatch = useAppDispatch()
    const { ProgramDataPhase, status} = useAppSelector(state => state.programPhase)

    useEffect(()=> {
        if(status === 'idle'){
            dispatch(fetchProgramPhase())
        }
    }, [])


    console.log(ProgramDataPhase);

    return(
        <Nav pills tabs className={'main-menu email-category border-0'}>
            {PhasesSidebar.map((phase, index) => (
                <NavItem key={index}>
                    <NavLink
                        className={navId === phase.id ? "active" : ""}
                        onClick={() => setNavId(phase.id)}
                    >
                        <div >
                            {phase.title}
                        </div>
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    )
}

export default PhaseNavMenu