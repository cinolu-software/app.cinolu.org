import { TrashNotificationData } from "@/Data/Application/Notifications";
import { TabPane } from "reactstrap";
import TrashNotificationContent from "./TrashNotificationContent";

const TrashContent = () => {
    return (
        <TabPane tabId="5">
            <div className="mail-body-wrapper">
                <ul className="simple-list">
                    {TrashNotificationData.map((data,i)=>(
                        <li className="inbox-data" key={i}>
                            <TrashNotificationContent data={data} ids={i}/>
                        </li>
                    ))}
                </ul>
            </div>
        </TabPane>
    );
};

export default TrashContent;