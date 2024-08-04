import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ProgramBody  from "./ProgramBody"

const UpdateProgramContainer = () => {

  return (
    <Row>
      <Col >
        <Card>
          <CardHeader>
            <h5>{"Formulaire de modification du programme"}</h5>
          </CardHeader>
          <CardBody>
            <ProgramBody />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
};

export default UpdateProgramContainer;
