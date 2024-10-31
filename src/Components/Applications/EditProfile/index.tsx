import React from "react";
import { Container, Row , Col} from "reactstrap";
import EditProfileForm from "./EditProfileImageAndPassword/EditProfileForm";
import { toast, ToastContainer, Flip } from "react-toastify";
import UserProfileInfo from "./UserProfileInfo/UserProfileInfo";
import Link from "next/link";

const EditProfileContainer = () => {

  return (
    <Container fluid>
      <div className="edit-profile">
        <Row className={'mb-4'}>
          <Col className={'d-flex justify-content-end'}>
              <Link href={'/dashboard'} className={'btn btn-outline-primary'}>
                  <i className="bi bi-arrow-left"></i>
                  Retour
              </Link>
          </Col>
        </Row>
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
