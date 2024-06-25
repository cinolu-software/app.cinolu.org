import { Card, Col, Form } from "reactstrap";
import { EditProfile } from "@/Constant";
import { EditProfileFormBody } from "./EditProfileFormBody";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";

const EditProfileForm = () => {
  
  return (
    <Col xl="8">
      <Form onSubmit={(event) => event.preventDefault()}>
        <Card>
          <CommonCardHeader title={EditProfile} />
          <EditProfileFormBody />
        </Card>
      </Form>
    </Col>
  );

};

export default EditProfileForm;
