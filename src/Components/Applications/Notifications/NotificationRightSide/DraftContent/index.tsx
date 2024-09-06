import {DraftNotificationData} from "@/Data/Application/Notifications";
import { TabPane} from "reactstrap";
import DraftNotificationContent from "./DraftNotificationContent";

const DraftContent = () => {
    return (
        <TabPane tabId="4">
            <div className="mail-body-wrapper">
                <ul>
                    {DraftNotificationData.map((data,i)=>(
                        <li className="inbox-data" key={i}>
                            <DraftNotificationContent data={data} ids={i}/>
                        </li>
                    ))}
                </ul>
            </div>
        </TabPane>
    );
};

export default DraftContent;