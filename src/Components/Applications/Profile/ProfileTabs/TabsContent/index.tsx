import React from 'react';
import {CardBody, TabContent, TabPane} from "reactstrap";
import UserDetail from "@/Components/Applications/Profile/ProfileTabs/TabsContent/UserDetail";
import UserPersonalInfo from "@/Components/Applications/Profile/ProfileTabs/TabsContent/UserPersonalInfo";
import UserPassword from "@/Components/Applications/Profile/ProfileTabs/TabsContent/UserPassword";
import UserImageProfile from "@/Components/Applications/Profile/ProfileTabs/TabsContent/UserImageProfile";

const TabsContent : React.FC<{basicTab : string}> = ({basicTab}) => {

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId={'1'}>
                <UserDetail />
            </TabPane>
            <TabPane tabId={'2'}>
                <UserImageProfile/>
            </TabPane>
            <TabPane tabId={'3'}>
                <UserPassword/>
            </TabPane>
        </TabContent>
    )
}

export default TabsContent