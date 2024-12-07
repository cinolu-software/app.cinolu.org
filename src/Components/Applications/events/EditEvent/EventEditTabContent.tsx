import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditEventContainer from "@/Components/Applications/events/EditEvent/EditInfoEvent";
import AttachmentEvent from "@/Components/Applications/events/EditEvent/AttachmentEvent";


const EventEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditEventContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentEvent/>
            </TabPane>
        </TabContent>
    )
}

export default EventEditTabContent
