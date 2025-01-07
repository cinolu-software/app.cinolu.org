import React from 'react';
import { TabContent, TabPane } from 'reactstrap';



const TabsContent : React.FC<{basicTab: string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                
            </TabPane>
            <TabPane tabId={'2'}>
                
            </TabPane>
        </TabContent>
    )

}

export default TabsContent;