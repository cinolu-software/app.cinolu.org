import {useAppSelector} from "@/Redux/Hooks";
import InboxNotificationContent from './InboxNotificationContent';
import NotificationPagination from './NotificationPagination';
import { TabPane } from "reactstrap";

const InboxContent = () => {

    const { inboxNotification, page } = useAppSelector((state) => state.notifications);
    return (
        <TabPane tabId="1" >
            <div className="mail-body-wrapper">
                <ul>
                    {inboxNotification.map((data, i) => (
                        <li className={`inbox-data ${page ? i < 7 ? "hidden" : "" : i < 7 ? "" : "hidden" }`} key={i}>
                            <InboxNotificationContent data={data} ids={i} />
                        </li>
                    ))}
                </ul>
                <NotificationPagination />
            </div>
        </TabPane>
    );
};

export default InboxContent;