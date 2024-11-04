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
        <Nav tabs >
            {
                UserProfileNavData.map((data, index) => (
                    <Fragment key={index}>
                        <NavItem className="nav">
                            <NavLink className={activeTab === data.id ? "active" : ""} onClick={() => tabHandler(data.id)}>
                                {data.tittle}
                            </NavLink>
                        </NavItem>
                    </Fragment>
                ))
            }
        </Nav>
    )
}

export default NavBarMain