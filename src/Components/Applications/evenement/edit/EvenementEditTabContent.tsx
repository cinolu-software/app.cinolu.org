import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import AttachmentEvenement from "@/Components/Applications/evenement/edit/attachmentEvenement";
import EditEvenementForm from "@/Components/Applications/evenement/edit/editStep";

const EvenementEditTabContent : React.FC<{activeTab: string}> = ({activeTab}) => {

    return (
        <TabContent className="dark-field" activeTab={activeTab}>
            <TabPane tabId="1">
                <EditEvenementForm />
            </TabPane>
            <TabPane tabId="2">
               <AttachmentEvenement />
            </TabPane>
        </TabContent>
    );

}

export default EvenementEditTabContent;