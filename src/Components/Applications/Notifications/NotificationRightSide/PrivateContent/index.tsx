import {PrivateNotificationData} from "@/Data/Application/Notifications";
import { TabPane } from "reactstrap";
import PrivateNotificationContent from './PrivateNotificationContent';

const PrivateContent = () => {
    return (
        <TabPane tabId="7">
            <div className="mail-body-wrapper">
                <ul>
                    {PrivateNotificationData.map((data,i)=>(
                        <li className="inbox-data" key={i}>
                            <PrivateNotificationContent data={data} ids={i}/>
                        </li>
                    ))}
                </ul>
            </div>
        </TabPane>
    );
};

export default PrivateContent;