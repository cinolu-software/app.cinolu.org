import { Card, Col, Form } from "reactstrap";
import { EditProfileFormBody } from "./EditProfileFormBody";


const EditProfileForm = () => {
  
  return (
    <Col xl="7">
      <Form onSubmit={(event) => event.preventDefault()}>
        <Card>
          <EditProfileFormBody />
        </Card>
      </Form>
    </Col>
  );

};

export default EditProfileForm;
