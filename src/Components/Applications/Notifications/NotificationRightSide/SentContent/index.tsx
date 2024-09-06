import { SentNotificationData} from "@/Data/Application/Notifications";
import { TabPane} from "reactstrap";
import SentNotificationContent from "./SentNotificationContent";

const SentContent = () => {
    return (
        <TabPane tabId="2">
            <div className="mail-body-wrapper">
                <ul>
                    {SentNotificationData.map((data,i)=>(
                        <li className="inbox-data" key={i}>
                            <SentNotificationContent data={data} ids={i}/>
                        </li>
                    ))}
                </ul>
            </div>
        </TabPane>
    );
};

export default SentContent;