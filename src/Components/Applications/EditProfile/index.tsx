import React from "react";
import { Container, Row , Col} from "reactstrap";
import EditProfileForm from "./EditProfileImageAndPassword/EditProfileForm";
import { toast, ToastContainer, Flip } from "react-toastify";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";
import BackButton from "@/CommonComponent/BackButton";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";

const EditProfileContainer = () => {
  const {user} = useAppSelector(state=>state.auth)

  // @ts-ignore
  const roles = user?.roles.map(role=>role);


  return (
    <Container fluid>
      <div className="edit-profile">

        {
          !roles?.includes('user') && (
                <BackButton link={'/dashboard'}/>
            )
        }
        <Row>
          <UserProfileInfo/>
          <EditProfileForm />
        </Row>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default EditProfileContainer;
