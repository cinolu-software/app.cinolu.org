import {Card, Col, TabContent} from "reactstrap";
import React from "react";
import {PhaseRightSideProps} from "@/Types/Programs/PhasesType";
import RightSideHeader from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseRightSide/RightSideHeader";

const PhaseRightSide : React.FC<PhaseRightSideProps> = ({navId}) => {

    return(
        <Col xxl={'9'} xl={'8'} className={'box-col-12 my-5 bg-light-primary rounded'}>
            <div className={'email-right-aside'}>
                <div className={`email-body email-list`}>
                    <RightSideHeader/>
                    <TabContent activeTab={navId} id={'pills-important-tab'}>

                    </TabContent>
                </div>
            </div>
        </Col>
    )
}

export default PhaseRightSide;