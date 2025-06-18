import React from 'react';
import { TabContent, TabPane } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import FinishForm from "@/Components/Applications/evenement/edit/editStep/Steps/FinishForm";
import BaseInformations from "@/Components/Applications/evenement/edit/editStep/Steps/BaseInformations";
import Details from "@/Components/Applications/evenement/edit/editStep/Steps/Details";



const EvenementVerticalWizardTabContent :React.FC<ActivityFormTabContentPropsType> = ({ activeTab, callbackActive }) => {
    return (
        <TabContent className="dark-field" activeTab={activeTab}>
            <TabPane tabId={1}>
                <BaseInformations callbackActive={callbackActive} />
            </TabPane>
            <TabPane tabId={2}>
                <Details callbackActive={callbackActive}/>
            </TabPane>
            <TabPane tabId={3}>
                <FinishForm />
            </TabPane>
        </TabContent>
    );
};

export default EvenementVerticalWizardTabContent;