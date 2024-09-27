import React from "react";
import { Container, Row } from "reactstrap";
import EditProfileForm from "./EditProfileImageAndPassword/EditProfileForm";
import { toast, ToastContainer, Flip } from "react-toastify";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";

const EditProfileContainer = () => {

  return (
    <Container fluid>
      <div className="edit-profile">
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
