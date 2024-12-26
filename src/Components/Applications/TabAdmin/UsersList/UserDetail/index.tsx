import React, {useCallback, useState} from "react";
import {Card, Container} from "reactstrap";
import {useAppSelector} from "@/Redux/Hooks";
import BackButton from "@/CommonComponent/BackButton";
import ProfileHeader from "@/Components/Applications/TabAdmin/Common/UserDetails/ProfileHeader";

const UserDetailContainer = () => {

    const {selectedUser} = useAppSelector(state=>state.users);

    return (
        <Container fluid>
            <BackButton link={'/users/admin/list'}/>
            <Card>
                <ProfileHeader selectedUser={selectedUser}/>
            </Card>
        </Container>
    );
}

export default UserDetailContainer;