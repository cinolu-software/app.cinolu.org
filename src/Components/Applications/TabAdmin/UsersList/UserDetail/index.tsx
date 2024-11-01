import React, {useCallback, useState} from "react";
import {Container} from "reactstrap";
import UserProfile from './UserProfile/UserProfile';
import {useAppSelector} from "@/Redux/Hooks";


const UserDetailContainer = () => {

    const [activeTab, setActiveTab] = useState(1);
    const {selectedCoach} = useAppSelector(state=>state.users)
    const callback = useCallback((tab: number) => {
        setActiveTab(tab);
    }, []);



    return (
        <Container fluid>
            <div className="user-profile social-app-profile">
                <UserProfile callback={callback} user={selectedCoach}/>
            </div>
        </Container>
    );
}

export default UserDetailContainer