import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import EventsListContainer from "@/Components/Applications/evenement/list/all";
import PublishedEventsListContainer from "@/Components/Applications/evenement/list/published";



const TabsContent : React.FC<{basicTab: string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <EventsListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <PublishedEventsListContainer/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;