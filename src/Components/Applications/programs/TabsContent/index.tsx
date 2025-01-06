import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import ProgramsListContainer from "@/Components/Applications/programs/all";
import PublishedProgramsListContainer from "@/Components/Applications/programs/published";



const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <ProgramsListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <PublishedProgramsListContainer/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;