import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditActivityForm from "@/Components/Applications/activities/edit/editStep";
import AttachmentActivity from "@/Components/Applications/activities/edit/attachmentActivity";


const ActivityEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditActivityForm/>
            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentActivity/>
            </TabPane>
        </TabContent>
    )
}

export default ActivityEditTabContent