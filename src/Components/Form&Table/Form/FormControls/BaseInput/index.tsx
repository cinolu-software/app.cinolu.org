import React from "react";
import { Container, Row } from "reactstrap";
import BasicForm from "./BasicForm";

const BaseInputContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicForm />
      </Row>
    </Container>
  );
};

export default BaseInputContainer;
