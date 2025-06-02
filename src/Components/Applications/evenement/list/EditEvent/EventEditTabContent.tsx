import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import AttachmentEvent from "@/Components/Applications/evenement/list/EditEvent/AttachmentEvent";
import EditEvenementForm from "@/Components/Applications/evenement/list/EditEvent/editStep/Steps";



const EventEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>
                <EditEvenementForm/>
            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentEvent/>
            </TabPane>
        </TabContent>
    )
}

export default EventEditTabContent
