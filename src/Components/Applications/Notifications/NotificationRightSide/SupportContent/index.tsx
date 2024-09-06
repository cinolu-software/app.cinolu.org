import { SupportNotificationData } from "@/Data/Application/Notifications";
import { TabPane } from "reactstrap";
import UserNotificationContent from './UserNotificationContent';

const SupportContent = () => {
    return (
        <TabPane tabId="8">
            <div className="mail-body-wrapper">
                <ul className="simple-list">
                    {SupportNotificationData.map((data, i) => (
                        <li className="inbox-data" key={i}>
                            <UserNotificationContent data={data} ids={i}/>
                        </li>
                    ))}
                </ul>
            </div>
        </TabPane>
    );
};

export default SupportContent;