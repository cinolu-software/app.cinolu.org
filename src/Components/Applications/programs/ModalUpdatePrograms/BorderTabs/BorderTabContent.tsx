import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import UpdateProgramContainer from "../MultiStepForm";
import UpdateImageProgram from "../UpdateImageProgram/UpdateImageProgram";


export const BorderTabContent: React.FC<{ basicTab: string }> = ({ basicTab }) => {


    return (
        <TabContent activeTab={basicTab}>

            <TabPane tabId="1">
                <UpdateProgramContainer/>
            </TabPane>

            <TabPane tabId="2">
                <UpdateImageProgram/>
            </TabPane>

        </TabContent>
    );
};
