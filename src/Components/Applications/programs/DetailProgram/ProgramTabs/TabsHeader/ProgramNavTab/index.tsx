import {Nav, NavItem, NavLink} from 'reactstrap';
import {Href} from "@/Constant";
import React from 'react';
import SVG from '@/CommonComponent/SVG';

interface ProgramNavTabProps {
    navId: string;
    setNavId: React.Dispatch<any>
}

const ProgramNavTabs = [
    {
        title: "Informations",
        icon: "mail",
        id: "1",
    },
    {
        title: "Groupe",
        icon: "tread",
        id: "2",
    },
    {
        title: "Broadcast",
        icon: "goal",
        id: "3",
    },
];

const ProgramNavTab : React.FC<ProgramNavTabProps> = ({navId, setNavId}) => {

    return(
        <Nav className={'email-tabs'} id={'program-pills-tabContent'}>
            {
                ProgramNavTabs.map((data, i) => (
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

export default ProgramNavTab;