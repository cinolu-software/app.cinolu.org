import React, {useState} from "react";
import {Card, Col, Row, Container, TabContent, TabPane} from "reactstrap";
import PhaseSideBar from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseSideBar";
import PhaseRightSide from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseRightSide";
import CreatePhaseModal from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseSideBar/CreatePhaseModal";

const ProgramPhase = () => {

    const [activeTab, setActiveTab] = useState('1');

    return (
        <TabPane tabId={'2'}>
            <Container>
                <div className={'email-wrap email-main-wrapper'}>
                    <Row>
                        <CreatePhaseModal/>
                        <PhaseSideBar navId={activeTab} setNavId={setActiveTab} />
                        <PhaseRightSide navId={activeTab}/>
                    </Row>
                </div>
            </Container>
        </TabPane>
    )
}

export default ProgramPhase;