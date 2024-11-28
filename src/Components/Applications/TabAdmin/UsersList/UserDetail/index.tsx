import React, {useCallback, useState} from "react";
import {Container} from "reactstrap";
import {useAppSelector} from "@/Redux/Hooks";
import UpdateCoachModal from "@/Components/Applications/TabAdmin/UsersList/UserDetail/UpdateCoachModal";
import UserProfile from "@/Components/Applications/TabAdmin/UsersList/UserDetail/UserProfile/UserProfile"


const UserDetailContainer = () => {

    const {selectedUser} = useAppSelector(state=>state.users)


    return (
        <Container fluid>
            <div className="user-profile social-app-profile">
                <UserProfile  user={selectedUser}/>
                <UpdateCoachModal/>
            </div>
        </Container>
    );
}

export default UserDetailContainer