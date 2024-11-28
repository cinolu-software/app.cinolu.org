import React from "react";
import { Container, Row , Col} from "reactstrap";
import EditProfileForm from "./EditProfileImageAndPassword/EditProfileForm";
import { toast, ToastContainer, Flip } from "react-toastify";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";
import BackButton from "@/CommonComponent/BackButton";

const EditProfileContainer = () => {

  return (
    <Container fluid>
      <div className="edit-profile">
        <BackButton link={'/dashboard'}/>
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
