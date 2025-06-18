import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import AttachmentEvenement from "@/Components/Applications/evenement/edit/attachmentEvenement";



const EvenementEditTabContent: React.FC<{activeTab: string}> = ({activeTab}) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId={'1'}>

            </TabPane>
            <TabPane tabId={'2'}>
                <AttachmentEvenement/>
            </TabPane>
        </TabContent>
    )
}

export default EvenementEditTabContent;