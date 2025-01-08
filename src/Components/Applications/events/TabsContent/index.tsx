import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import EventsListContainer from "@/Components/Applications/events/all";
import PublishedEventsListContainer from "@/Components/Applications/events/published";



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