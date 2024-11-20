import React from "react";
import {Card, CardBody} from "reactstrap";
import PhaseNavMenu from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseSideBar/PhaseNavMenu";

interface PhaseLeftSidebarProps {
    navId: string;
    setNavId: (id: string) => void;
}

const PhaseLeftSidebar : React.FC<PhaseLeftSidebarProps> = ({navId, setNavId}) => {


    return (
        <div className={'email-left-aside'}>
            <Card>
                <CardBody>
                    <div className={'email-app-sidebar'}>
                        <button className={'btn btn-outline-primary emailbox'}>
                            <i className={'fa fa-plus'} /> Ajouter une phase
                        </button>
                        <PhaseNavMenu navId={navId} setNav={setNavId} />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default PhaseLeftSidebar