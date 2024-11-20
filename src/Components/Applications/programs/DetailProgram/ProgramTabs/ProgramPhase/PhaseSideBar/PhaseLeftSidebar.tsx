import React from "react";
import {Card, CardBody} from "reactstrap";
import PhaseNavMenu from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseSideBar/PhaseNavMenu";
import {PhaseLeftSidebarProps} from "@/Types/Programs/PhasesType";

const PhaseLeftSidebar : React.FC<PhaseLeftSidebarProps> = ({navId, setNavId}) => {


    return (
        <div className={'my-5 bg-light-primary rounded'}>
            <div>
                <div>
                    <div className={'email-app-sidebar'}>
                        <button className={'btn btn-outline-primary emailbox'}>
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