import React from 'react';
import {TabContent, TabPane} from 'reactstrap';
import ProgramsListContainer from "@/Components/Applications/programs/all";



const TabsContent : React.FC<{basicTab: string}> = ({basicTab})=> {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <ProgramsListContainer/>
            </TabPane>
            <TabPane tabId={'2'}>
                <h1>test21</h1>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent;