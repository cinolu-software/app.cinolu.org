import {Nav, NavLink, NavItem} from "reactstrap";
import React, {useState, Fragment} from "react";
import {UserProfileAppCallBackType} from "@/Types/Users/Profile/UserProfileType";
import {UserProfileNavData} from "@/Data/Application/UserProfile";


const NavBarMain : React.FC<UserProfileAppCallBackType> = ({callback, user}) => {

    const [activeTab, setActiveTab] = useState(1);


    const tabHandler = (id: number) => {
        setActiveTab(id);
        callback(id);
    }


    return (
        <Nav tabs className={'border-tab tabs-scoial'}>
            {
                UserProfileNavData.map((data, index) => (
                    <Fragment key={index}>
                        {data.userProfile ? (
                            <NavItem>
                                <div className="user-designation" />
                                <div className="title">
                                    <a href={`/app/social_app`}>{user?.name}</a>
                                </div>
                                <div className="desc mt-2">{user?.roles[0]?.name}</div>
                            </NavItem>
                        ) : (
                            <NavItem className="nav">
                                <NavLink className={activeTab === data.id ? "active" : ""} onClick={() => tabHandler(data.id)}>
                                    {data.tittle}
                                </NavLink>
                            </NavItem>
                        )}
                    </Fragment>
                ))
            }
        </Nav>
    )
}

export default NavBarMain