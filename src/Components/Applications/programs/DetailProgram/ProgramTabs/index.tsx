import React, {useState} from "react";
import {Card, Col, TabContent} from "reactstrap";
import TabsHeader from "@/Components/Applications/programs/DetailProgram/ProgramTabs/TabsHeader";
import ProgramInfo from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramInfo";
import ProgramPhase from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase";
import ProgramRapport from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramRapport";


const ProgamTabs = () => {

    const [navId, setNavId] = useState('1');

    return (
        <Col className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <Card className={`email-body email-list`}>
                    <TabsHeader navId={navId} setNavId={setNavId}/>
                    <TabContent  activeTab={navId} id="notifications-pills-tabContent">
                        <ProgramInfo/>
                        <ProgramPhase/>
                        <ProgramRapport/>
                    </TabContent>
                </Card>
            </div>
        </Col>
    )

}

export default ProgamTabs