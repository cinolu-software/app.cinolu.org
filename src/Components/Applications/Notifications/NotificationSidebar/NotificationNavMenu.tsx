import React from "react";
import SVG from '@/CommonComponent/SVG';
import { Inbox } from '@/Constant';
import { useAppSelector } from "@/Redux/Hooks";
import { Badge, Nav, NavItem, NavLink} from "reactstrap";
import { NotificationBoxNavType } from '@/Types/Notifications/NotificationType';
import { NotificationBoxSidebar } from '@/Data/Application/Notifications/';
import AddLabel from "./AddLabel";


const NotificationNavMenu : React.FC<NotificationBoxNavType> = ({ navId, setNavId}) => {

    const { inboxNotification } = useAppSelector((state) => state.notifications);
    let starBadges = inboxNotification.filter((data) => data.star === true && 1 );

    return (
        <Nav pills tabs className={'main-menu email-category border-0'}>
            {
                NotificationBoxSidebar.map((data, i) => (
                    <NavItem key={i}>
                        <NavLink className={`border-0 ${navId === data.id ? 'active' : ''}`} onClick={ () => setNavId(data.id)}>
                            <SVG className={`stroke-icon ${data.color ? `stroke-${data.color}` : ""}`} iconId={data.icon}/>
                            <div>
                                {data.title}
                                {data.badge && <Badge color="light-primary">{data.title === Inbox ? inboxNotification.length : starBadges.length}</Badge>}
                            </div>
                        </NavLink>
                    </NavItem>
              ))
            }
            <AddLabel/>
        </Nav>
    );

}
export default NotificationNavMenu;