import { Button, Col, Form, Input, Label, Row } from "reactstrap";

const BasicForm = () => {

  return (

    <Col md="12">
      <Form onSubmit={(e)=>e.preventDefault()} className={"mt-3"}>
        <Row className="g-3 ms-2">
          <Col md="12">
            <Label check>{"Ancien Mot de passe"}</Label>
            <Input type="email" placeholder={"Ancien Mot de passe"} />
          </Col>
          <Col ms="12">
            <Label check>{"Nouveau Mot de passe"}</Label>
            <Input type="password" placeholder={"Nouveau Mot de passe"} autoComplete="" />
          </Col>
          <Col ms="12">
            <Label check>{"Entrez à nouveau le Mot de passe"}</Label>
            <Input type="password" placeholder={"Entrez à nouveau le Mot de passe"} autoComplete="" />
          </Col>

          <Col sm="12"><Button color="primary">{"Modifier le mot de passe"}</Button></Col>
        </Row>
      </Form>
    </Col>
  );
};

export default BasicForm;
