import React from 'react';
import {TabContent, TabPane} from "reactstrap";



const PartnerEditTabContent: React.FC<{activeTab : string}> = ({activeTab}) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">

            </TabPane>
            <TabPane tabId="2">

            </TabPane>
        </TabContent>
    )
}
export default PartnerEditTabContent
