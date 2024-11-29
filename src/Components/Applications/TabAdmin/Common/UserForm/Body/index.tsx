import UserLeftSideBar from "@/Components/Applications/TabAdmin/Common/UserForm/Body/UserLeftSidebar";
import UserTabContent from "@/Components/Applications/TabAdmin/Common/UserForm/Body/UserTabContent";

import {Row} from 'reactstrap';


const Body = () => {
    return (
        <Row className={'g-xl-5 g-3'}>
            <UserLeftSideBar/>
            <UserTabContent/>
        </Row>
    )
}

export default Body;