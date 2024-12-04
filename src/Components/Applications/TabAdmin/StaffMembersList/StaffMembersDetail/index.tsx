import React from "react";
import {Container} from "reactstrap";
import {useAppSelector} from "@/Redux/Hooks";
import UpdateUserModal from "@/Components/Applications/TabAdmin/Common/UpdateUserModal";
import UserProfile from "@/Components/Applications/TabAdmin/Common/UserProfile/UserProfile";
import BackButton from "@/CommonComponent/BackButton";


const StaffMemberDetailContainer = () => {

    const {selectedStaffMember} = useAppSelector(state=>state.users);

    return (
        <Container fluid>
            <BackButton link={'/users/admin/staffMembers'}/>
            <div className="user-profile social-app-profile">
                <UserProfile  user={selectedStaffMember}/>
                <UpdateUserModal selectedUser={selectedStaffMember} />
            </div>
        </Container>
    );

}

export default StaffMemberDetailContainer;