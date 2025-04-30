import React from 'react';
import {Container} from "reactstrap";
import {toast, ToastContainer, Flip} from "react-toastify";
import BackButton from "@/CommonComponent/BackButton";
import UserForm from "@/Components/Applications/TabAdmin/Common/UserForm";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";


const UpdateUser = () => {

    const {selectedUser} = useAppSelector(state => state.users);


    return (
        <Container fluid>
            <BackButton link={"/users/admin/list"}/>
            <UserForm mode="edit" initialData={selectedUser} />
            <ToastContainer />
        </Container>
    )
}

export default UpdateUser;