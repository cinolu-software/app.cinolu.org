import SVG from '@/CommonComponent/SVG';
import { ImagePath} from "@/Constant";
import { useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { handleEnvelope, handleInterview } from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import { CommonDataType} from "@/Types/Notifications/NotificationType";
import React, {useState} from "react";
import { Badge, Input, Label} from "reactstrap";


const SentNotificationContent: React.FC<CommonDataType> = ({data, ids}) => {

    const {faIcon} = useAppSelector((state)=>state.notifications);
    const [fill,setFill] = useState(false);
    const dispatch = useAppDispatch();
    const handleValue= () => dispatch(handleInterview(true));

    return (
        <>
            <div className="inbox-user">
                <div className="rounded-border">
                    {data.image && <img src={`${ImagePath}/user/${data.image}`} alt="user" />}
                    {data.shortName && <div className={data.color === "success" ? "circle-success" : ""}>
                        <p className={`txt-${data.color}`}>{data.shortName}</p>
                    </div>}
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
                        {data.badge &&
                            data.badge.map((item, i) => (
                                <Badge color="" className={`badge-light-${item.color} text-${item.color === "light" ? "light-dark" : item.color }`} key={i}> {item.title} </Badge>
                            ))}
                    </div>
                </div>
                <div className="email-timing">
                    <span>{data.time}</span>
                </div>
                <div className="email-options">
                    <i className={`fa fa-envelope-o envelope-1 ${!faIcon ? "show" : "hide"}`} onClick={() => dispatch(handleEnvelope(true))}/>
                    <i className={`fa fa-envelope-open-o envelope-2 ${ faIcon ? "show" : "hide"}`} onClick={() => dispatch(handleEnvelope(false))} />
                    <i className="fa fa-trash-o trash-3" />
                    <i className="fa fa-print" />
                </div>
            </div>
        </>
    );
}

export default SentNotificationContent;