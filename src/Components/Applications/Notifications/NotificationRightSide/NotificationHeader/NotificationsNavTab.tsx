import { Nav, NavItem, NavLink } from 'reactstrap';
import { Href } from "@/Constant";
import { NotificationNavTabs} from "@/Data/Application/Notifications";
import SVG from '@/CommonComponent/SVG';
import React from "react";

interface NotificationNavTabProps {
    navId: string;
    setNavId: React.Dispatch<React.SetStateAction<string>>;
}

const NotificationNavTab: React.FC<NotificationNavTabProps> =  ({navId, setNavId}) => {


    return (
        
        <Nav className={'email-tabs'} id={'notifications-pills-tabContent'}>
            {
                NotificationNavTabs.map((data, i) => (
                    <NavItem key={i}>
                        <NavLink className={navId === data.id ? "active" : ""} id={data.id} href={Href} onClick={()=>setNavId(data.id)} >
                            <SVG className="stroke-icon" iconId={data.icon} />
                            <span>{data.title} </span>
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    )
}

export default NotificationNavTab;