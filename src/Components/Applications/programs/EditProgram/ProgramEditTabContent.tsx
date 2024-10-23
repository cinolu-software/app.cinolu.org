import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditProgramContainer from "@/Components/Applications/programs/EditProgram/EditInfoProgram";


const ProgramEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditProgramContainer/>
            </TabPane>
            <TabPane tabId={'2'}></TabPane>
        </TabContent>
    )
}
export default ProgramEditTabContent
