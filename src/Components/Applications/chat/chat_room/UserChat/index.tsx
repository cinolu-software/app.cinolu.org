import {Card, Col} from "reactstrap";
import RightChatBody from "./RightChatBody";

const UserChat = () => {


    return (
        <Col xxl="9" xl="8" md="7" className="box-col-7">
            <Card className="right-sidebar-chat pt-5">
                <RightChatBody />
            </Card>
        </Col>
    )
}

export default UserChat