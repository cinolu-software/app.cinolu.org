import React from 'react';
import { TabContent, TabPane } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";



const BusinessVerticalWizardTabContent :React.FC<ActivityFormTabContentPropsType> = ({ activeTab, callbackActive }) => {
    return (
        <TabContent className="dark-field" activeTab={activeTab}>
            <TabPane tabId={1}>
                {/*<SelectAccount callbackActive={callbackActive} />*/}
            </TabPane>
            <TabPane tabId={2}>
                {/*<BusinessSettingsForm callbackActive={callbackActive} />*/}
            </TabPane>
            <TabPane tabId={3}>
                {/*<ContactDetailsForm callbackActive={callbackActive} />*/}
            </TabPane>
            <TabPane tabId={4}>
                {/*<PayDetailsForm callbackActive={callbackActive} />*/}
            </TabPane>
            <TabPane tabId={5}>
                {/*<FinishForm />*/}
            </TabPane>
        </TabContent>
    );
};

export default BusinessVerticalWizardTabContent;