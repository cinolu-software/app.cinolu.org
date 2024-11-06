import React, {useCallback, useState} from "react";
import {Container} from "reactstrap";
import CoachProfile from "@/Components/Applications/TabAdmin/CoachsList/CoachDetail/CoachProfile/CoachProfile";
import {useAppSelector} from "@/Redux/Hooks";
import CoachProfilTabContent from "@/Components/Applications/TabAdmin/CoachsList/CoachDetail/CoachProfilContext";
import UpdateCoachModal from "@/Components/Applications/TabAdmin/CoachsList/CoachDetail/UpdateCoachModal";


const UserDetailContainer = () => {

    const [activeTab, setActiveTab] = useState(1);
    const {selectedCoach} = useAppSelector(state=>state.users)
    const callback = useCallback((tab: number) => {
        setActiveTab(tab);
    }, []);

    return (
        <Container fluid>
            <div className="user-profile social-app-profile">
                <CoachProfile callback={callback} user={selectedCoach}/>
                <CoachProfilTabContent basicTab={activeTab}  user={selectedCoach}/>
                <UpdateCoachModal/>
            </div>
        </Container>
    );
}

export default UserDetailContainer