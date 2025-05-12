import React from 'react';
import { TabContent, TabPane } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import FinishForm from "@/Components/Applications/activities/create/Steps/FinishForm";
import BaseInformations from "@/Components/Applications/activities/create/Steps/BaseInformations";
import Details from "@/Components/Applications/activities/create/Steps/Details";
import FormActivity from "@/Components/Applications/activities/create/Steps/FormActivity";
import ReviewForm from "@/Components/Applications/activities/create/Steps/ReviewForm";

const ActivityVerticalWizardTabContent :React.FC<ActivityFormTabContentPropsType> = ({ activeTab, callbackActive }) => {
    return (
        <TabContent className="dark-field" activeTab={activeTab}>
            <TabPane tabId={1}>
                <BaseInformations callbackActive={callbackActive} />
            </TabPane>
            <TabPane tabId={2}>
                <Details callbackActive={callbackActive}/>
            </TabPane>
            <TabPane tabId={3}>
                <FormActivity callbackActive={callbackActive}/>
            </TabPane>
            <TabPane tabId={4}>
                <ReviewForm callbackActive={callbackActive}/>
            </TabPane>
            <TabPane tabId={5}>
                <FinishForm />
            </TabPane>
        </TabContent>
    );
};

export default ActivityVerticalWizardTabContent;