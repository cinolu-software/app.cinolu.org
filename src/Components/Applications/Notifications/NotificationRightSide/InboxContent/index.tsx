import { useEffect } from "react";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import InboxNotificationContent from './InboxNotificationContent';
import NotificationPagination from './NotificationPagination';
import { TabPane } from "reactstrap";
import { fetchUsers } from "@/Redux/Reducers/userSlice/UserSlice";



const InboxContent = () => {

    const { inboxNotification, page } = useAppSelector((state) => state.notifications);
    const dispatch = useAppDispatch();
    const {usersData, status, error} = useAppSelector(state => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    return (
        <TabPane tabId="1" >
            <div className="mail-body-wrapper">
                <ul>
                    {usersData?.map((user)=>(
                        <li className="inbox-data" key={user.id}>
                            <InboxNotificationContent data={user} ids={user.id}/>
                        </li>
                    ))}
                </ul>
                <NotificationPagination />
            </div>
        </TabPane>
    );
};

export default InboxContent;