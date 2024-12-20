import React, {useCallback, useState} from "react";
import {Container} from "reactstrap";
import {useAppSelector} from "@/Redux/Hooks";
import UpdateUserModal from "@/Components/Applications/TabAdmin/Common/UpdateUserModal";
import UserProfile from "@/Components/Applications/TabAdmin/Common/UserProfile/UserProfile";
import BackButton from "@/CommonComponent/BackButton";

const UserDetailContainer = () => {

    const {selectedUser} = useAppSelector(state=>state.users);

    return (
        <Container fluid>
            <BackButton link={'/users/admin/list'}/>
            <div className="user-profile social-app-profile">
                <UserProfile  user={selectedUser}/>
                <UpdateUserModal selectedUser={selectedUser} />
            </div>
        </Container>
    );
}

export default UserDetailContainer;