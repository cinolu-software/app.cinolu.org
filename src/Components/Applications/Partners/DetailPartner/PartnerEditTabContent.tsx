import React from 'react';
import {TabContent, TabPane} from "reactstrap";
import EditProgramInfo from "@/Components/Applications/Partners/DetailPartner/EditProgramInfo";
import PartnerLogo from "@/Components/Applications/Partners/DetailPartner/PartnerLogo";



const PartnerEditTabContent: React.FC<{activeTab : string}> = ({activeTab}) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <EditProgramInfo/>
            </TabPane>
            <TabPane tabId="2">
                <PartnerLogo/>
            </TabPane>
        </TabContent>
    )
}
export default PartnerEditTabContent
