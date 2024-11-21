import {Badge, Nav, NavItem, NavLink} from "reactstrap";
import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProgramPhase } from "@/Redux/Reducers/programsSlice/ProgramPhaseSlice";
import { PhaseNavMenuProps } from "@/Types/Programs/PhasesType";

const PhaseNavMenu: React.FC<PhaseNavMenuProps> = ({navId, setNavId}) => {
    const dispatch = useAppDispatch();
    const { ProgramDataPhase, status } = useAppSelector(state => state.programPhase);
    const { selectedProgram } = useAppSelector(state => state.programs);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramPhase());
        }
    }, [status, dispatch]);





    const filteredPhases = ProgramDataPhase.filter(phase => phase.program === selectedProgram?.id);

    return (
        <Nav pills tabs className={'main-menu email-category border-0'}>
            {filteredPhases.map((phase, index) => (
                <NavItem key={index}>
                    <NavLink
                        className={navId === phase.id ? "active" : ""}
                        onClick={() => setNavId(phase.id)}
                    >
                        <div>
                            {phase.name} 
                        </div>
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
}

export default PhaseNavMenu;
