import React from 'react';
import {Container} from "reactstrap";
import {toast, ToastContainer, Flip} from "react-toastify";
import BackButton from "@/CommonComponent/BackButton";
import UserForm from "@/Components/Applications/TabAdmin/Common/UserForm";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";


const UpdateCoach = () => {

    const {selectedCoach} = useAppSelector(state => state.users);

    return (
        <Container fluid>
            <BackButton link={"/users/admin/coachs"}/>
            <UserForm mode="edit" initialData={selectedCoach} />
            <ToastContainer />
        </Container>
    )
}

export default UpdateCoach;