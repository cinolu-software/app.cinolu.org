import { Nav, NavItem, NavLink } from 'reactstrap';
import { Href } from "@/Constant";
import { useState } from 'react';
import { NotificationNavTabs} from "@/Data/Application/Notifications";
import SVG from '@/CommonComponent/SVG';

const NotificationNavTab = () => {

    const [navId, setNavId] = useState('1');

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