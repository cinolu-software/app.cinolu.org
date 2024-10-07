import React from "react";
import {useEffect} from "react";
import {fetchUsers} from "@/Redux/Reducers/userSlice/UserSlice";
import { ImagePath } from '@/Constant';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { addToFavorites , handleEnvelope, handleInterview, removeItems} from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import { CommonDataType} from "@/Types/Notifications/NotificationType";
import {Badge, Input, Label} from 'reactstrap';



const InboxNotificationContent: React.FC<CommonDataType> = () => {

    const {faIcon} = useAppSelector(state => state.notifications);
    const dispatch = useAppDispatch();
    const {usersData, status, error} = useAppSelector(state => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);


    const handleValue = ()=> {
        dispatch(handleInterview(true))
    }

    const handleRemoveEmail = (id:number) => {
        dispatch(removeItems(id));
    }

    if (status === 'loading') {
        return <div>Chargement des utilisateurs...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <>
            {/*{*/}
            {/*    usersData.map( user => (*/}
            {/*        <div key={user.id} className={'inbox-user'}>*/}
            {/*            <div className={'rouded-border'}>*/}
            {/*                {<img  src={`${ImagePath}/user/20.jpg}`} alt={user.name}/>}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
            <div className="inbox-user">
                <div className="rounded-border">
                    {data.image && <img src={`${ImagePath}/user/${data.image}`} alt="user"/>}
                    {
                        data.shortName && (
                            <div className={data.color === "success" ? "circle-success" : ""}>
                                <p className={`txt-${data.color}`}>{data.shortName}</p>
                            </div>
                        )
                    }
                </div>
                <p>{data.name}</p>
            </div>

            <div className="inbox-message">
                <div className="email-data" onClick={handleValue}>
                    <span>
                        {data.message}
                        <span>{data.subMessage}</span>
                    </span>
                    <div className="inbox-width d-flex gap-2">
                        {
                            data.badge &&
                            data.badge.map((item, i) => (
                                <Badge color=""
                                       className={`badge-width badge-light-${item.color} text-${item.color === "light" ? "light-dark" : item.color}`}
                                       key={i}>{item.title}</Badge>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InboxNotificationContent;