import {Card, Col, TabContent} from "reactstrap";
import React, {useState} from "react";
import {PhaseRightSideProps} from "@/Types/Programs/PhasesType";
import RightSideHeader from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseRightSide/RightSideHeader";
import PhaseDetails from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseRightSide/PhaseDetails";
import PhaseForm from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseRightSide/PhaseForm";


const PhaseRightSide : React.FC<PhaseRightSideProps> = ({navId}) => {

    const [tabId, setTabId] = useState<string>("details-tab");

    return (
        <Col xxl="9" xl="9" className="box-col-12 my-5 bg-light-primary rounded">
            <div className="email-right-aside">
                <div className="email-body email-list">

                    <RightSideHeader tabId={tabId} setTabId={setTabId} />
                    <TabContent activeTab={tabId} id="phases-content-tab">
                        <PhaseDetails navId={navId}/>
                        <PhaseForm />
                    </TabContent>
                </div>
            </div>
        </Col>
    );
};

export default PhaseRightSide;