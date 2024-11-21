import React from "react";
import PhaseNavMenu from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseSideBar/PhaseNavMenu";
import {PhaseLeftSidebarProps} from "@/Types/Programs/PhasesType";
import {setModalcreateProgramPhase} from "@/Redux/Reducers/programsSlice/ProgramPhaseSlice";
import {useAppDispatch} from "@/Redux/Hooks";

const PhaseLeftSidebar : React.FC<PhaseLeftSidebarProps> = ({navId, setNavId}) => {

    const dispatch = useAppDispatch();

    return (
        <div className={'my-5 bg-light-primary rounded'}>
            <div>
                <div>
                    <div className={'email-app-sidebar'}>
                        <button className={'btn btn-outline-primary emailbox'} onClick={()=>dispatch(setModalcreateProgramPhase({isOpen: true}))}>
                            <i className={'fa fa-plus'} /> Ajouter une phase
                        </button>
                        <PhaseNavMenu navId={navId} setNavId={setNavId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhaseLeftSidebar