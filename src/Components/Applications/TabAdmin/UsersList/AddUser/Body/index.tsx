import UserLeftSidebar from "@/Components/Applications/TabAdmin/UsersList/AddUser/Body/UserLeftSidebar";
import UserTabContent from "@/Components/Applications/TabAdmin/UsersList/AddUser/Body/UserTabContent";
import {Row} from 'reactstrap';


const Body = () => {
    return (
        <Row className={'g-xl-5 g-3'}>
            <UserLeftSidebar/>
            <UserTabContent/>
        </Row>
    )
}

export default Body;