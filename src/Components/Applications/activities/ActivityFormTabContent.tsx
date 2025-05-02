import {TabContent, TabPane} from 'reactstrap';
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import React from "react";


const ActivitiesFormTabContent : React.FC<ActivityFormTabContentPropsType> = ({activeTab, callbackActive}) => {
    return (
        <TabContent className={'dark-field shipping-content'} activeTab={activeTab}>
            <TabPane tabId={1}>

            </TabPane>
            <TabPane tabId={2}>

            </TabPane>
            <TabPane tabId={3}>

            </TabPane>
        </TabContent>
    )
}

export default ActivitiesFormTabContent;