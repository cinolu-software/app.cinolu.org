import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import ProjectListContainer from "@/Components/Applications/activities/list/all";
import PublishedProjectListContainer from "@/Components/Applications/activities/list/published";


const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <ProjectListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <PublishedProjectListContainer/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;