import { WorkNotificationData} from "@/Data/Application/Notifications";
import { TabPane } from "reactstrap";
import WorkNotificationContent from './WorkNotificationContent';

const WorkContent = () => {
    return (
        <TabPane tabId="6">
            <div className="mail-body-wrapper">
                <ul>
                    {WorkNotificationData.map((data,i)=>(
                        <li className="inbox-data" key={i}>
                            <WorkNotificationContent data={data} ids={i}/>
                        </li>
                    ))}
                </ul>
            </div>
        </TabPane>
    );
};

export default WorkContent;