import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditProgramContainer from "@/Components/Applications/programs/EditProgram/EditInfoProgram";
import EditProgramTabs from './AttachmentProgram';


const ProgramEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditProgramContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <EditProgramTabs/>
            </TabPane>
        </TabContent>
    )
}


export default ProgramEditTabContent
