import React from "react";
import UserLeftSideBar from "@/Components/Applications/TabAdmin/Common/UserForm/Body/UserLeftSidebar";
import UserTabContent from "@/Components/Applications/TabAdmin/Common/UserForm/Body/UserTabContent";
import {Row} from 'reactstrap';



const Body : React.FC<{mode: string , selectedUser?: any}> = ({mode, selectedUser}) => {
    return (
        <Row className={'g-xl-5 g-3'}>
            <UserLeftSideBar/>
            <UserTabContent mode={mode}  selectedUser={selectedUser}/>
        </Row>
    )
}

export default Body;