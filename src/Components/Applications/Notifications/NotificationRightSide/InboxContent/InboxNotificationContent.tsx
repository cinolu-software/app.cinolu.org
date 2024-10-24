import React from "react";
import {useEffect} from "react";
import {fetchUsers} from "@/Redux/Reducers/userSlice/UserSlice";
import { ImagePath } from '@/Constant';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import {  handleInterview, setSelectedUser} from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import { CommonDataType} from "@/Types/Notifications/NotificationType";
import { Badge } from "reactstrap";

type InboxNotificationContentProps = {
    data: any;
    ids: any;
}


const InboxNotificationContent: React.FC<InboxNotificationContentProps> = ({data , ids}) => {

    const {faIcon} = useAppSelector(state => state.notifications);
    const dispatch = useAppDispatch();


    const handleValue = ()=> {
        dispatch(setSelectedUser(data));
        dispatch(handleInterview(true));
    }

    return (
        <>
            <div className={'inbox-user'}>
                <div className="rounded-border">
                    {<img src={`${ImagePath}/user/20.jpg`} alt={data.name}/>}
                </div>
                <p>{data.name}</p>
            </div>

            <div className="inbox-message">
               <div className="email-data" onClick={handleValue}>
               <Badge color="" className={`badge-width badge-light-primary`}>{"Envoyer la notification"}</Badge>  
               </div>
            </div>
        </>
    );
}

export default InboxNotificationContent;