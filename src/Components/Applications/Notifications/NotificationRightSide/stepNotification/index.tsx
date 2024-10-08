import { Row } from "reactstrap"
import NotificationLeftSidebar from "./NotificationLeftSidebar";
import NotificationTabContent from "./NotificationTabContent";

const NotificationBody = () => {

  return (
    <Row className="g-xl-5 g-3">
        <NotificationLeftSidebar/>
        <NotificationTabContent/>
    </Row>
  )
  
}

export default NotificationBody