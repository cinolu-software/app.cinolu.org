import React from 'react';
import {Container} from "reactstrap";
import { ToastContainer} from "react-toastify";
import BackButton from "@/CommonComponent/BackButton";
import UserForm from "@/Components/Applications/TabAdmin/Common/UserForm";
import {useAppSelector} from "@/Redux/Hooks";


const UpdateStaffMembers = () => {

    const {selectedStaffMember} = useAppSelector(state => state.users);

    return (
        <Container fluid>
            <BackButton link={"/users/admin/staffMembers"}/>
            <UserForm mode="edit" initialData={selectedStaffMember} />
            <ToastContainer />
        </Container>
    )
}

export default UpdateStaffMembers;