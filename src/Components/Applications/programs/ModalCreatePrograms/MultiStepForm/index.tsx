import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ProgramBody  from "./ProgramBody"

const AddProgramContainer = () => {

  return (

    <Row>
      <Col >
        <Card>
          <CardHeader>
            <h5>{"Formulaire d'ajout de programme"}</h5>
          </CardHeader>
          <CardBody>
            <ProgramBody />
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  )
};

export default AddProgramContainer;
