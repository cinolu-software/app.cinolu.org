import React from 'react';
import { TabContent, TabPane } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import SelectAccount from "@/Components/Applications/activities/Steps/SelectAccount";
import BusinessSettingsForm from "@/Components/Applications/activities/Steps/BusinessSettingsForm";
import ContactDetailsForm from "@/Components/Applications/activities/Steps/ContactDetailsForm";
import PayDetailsForm from "@/Components/Applications/activities/Steps/PayDetailsForm";
import FinishForm from "@/Components/Applications/activities/Steps/FinishForm";
import BaseInformations from "@/Components/Applications/activities/Steps/BaseInformations";

const BusinessVerticalWizardTabContent :React.FC<ActivityFormTabContentPropsType> = ({ activeTab, callbackActive }) => {
    return (
        <TabContent className="dark-field" activeTab={activeTab}>
            <TabPane tabId={1}>
                {/*<SelectAccount callbackActive={callbackActive} />*/}
                <BaseInformations callbackActive={callbackActive} />
            </TabPane>
            <TabPane tabId={2}>
                <BusinessSettingsForm callbackActive={callbackActive} />
            </TabPane>
            <TabPane tabId={3}>
                <ContactDetailsForm callbackActive={callbackActive} />
            </TabPane>
            <TabPane tabId={4}>
                <PayDetailsForm callbackActive={callbackActive} />
            </TabPane>
            <TabPane tabId={5}>
                <FinishForm />
            </TabPane>
        </TabContent>
    );
};

export default BusinessVerticalWizardTabContent;