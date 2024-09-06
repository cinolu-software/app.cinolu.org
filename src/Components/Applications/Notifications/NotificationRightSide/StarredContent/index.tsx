import { useAppSelector} from "@/Redux/Hooks";
import StarredNotificationContent from "./StarredNotificationContent";
import { Fragment} from "react";
import { TabPane} from "reactstrap";
import SearchNotFoundClass from "@/Components/Applications/Contact/TabData/SearchNotFoundClass";

const StarredContent = () => {
    const { inboxNotification } = useAppSelector((state) => state.notifications);
    let starBadges = inboxNotification.filter((data) => data.star === true && 1);

    return (
        <TabPane tabId="3">
            <div className="mail-body-wrapper">
                <ul>
                    {starBadges.length > 0 ? (
                        inboxNotification.map((data, i) => (
                            <Fragment key={i}>
                                {data.star && (
                                    <li className="inbox-data">
                                        <StarredNotificationContent data={data} ids={i} />
                                    </li>
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <SearchNotFoundClass word="Email" />
                    )}
                </ul>
            </div>
        </TabPane>
    );
}

export default StarredContent;