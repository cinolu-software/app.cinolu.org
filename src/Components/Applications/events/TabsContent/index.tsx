import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import EventsListContainer from "@/Components/Applications/events/all";



const TabsContent : React.FC<{basicTab: string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <EventsListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                
            </TabPane>
        </TabContent>
    )

}

export default TabsContent;