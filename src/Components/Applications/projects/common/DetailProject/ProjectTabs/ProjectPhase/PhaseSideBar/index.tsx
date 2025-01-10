import React, {useState} from "react";
import {Button, Col} from "reactstrap";
import PhaseLeftSidebar from "@/Components/Applications/programs/common/DetailProgram/ProgramTabs/ProgramPhase/PhaseSideBar/PhaseLeftSidebar";
import {PhaseSideBarProps} from "@/Types/Project/PhasesType";

const PhaseSideBar: React.FC<PhaseSideBarProps> = ({navId, setNavId}) => {

    return (
        <Col xxl={'3'} xl={'3'} className={''}>
            <div className="md-sidebar">
                <div className={`md-sidebar-aside job-left-aside custom-scrollbar`}>
                    <PhaseLeftSidebar navId={navId} setNavId={setNavId}/>
                </div>
            </div>
        </Col>
    )
}

export default PhaseSideBar