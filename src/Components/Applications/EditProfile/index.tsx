import React from "react";
import { Container, Row } from "reactstrap";
import MyProfile from "./MyProfile/MyProfile";
import EditProfileForm from "./EditProfiles/EditProfileForm";
import { toast, ToastContainer, Flip } from "react-toastify";

const EditProfileContainer = () => {
  return (
    <Container fluid>
      <div className="edit-profile">
        <Row>
          <MyProfile/>
          <EditProfileForm />
        </Row>
      </div>
        <ToastContainer />
    </Container>
  );
};

export default EditProfileContainer;
