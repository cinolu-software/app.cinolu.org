import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ProgramBody  from "./ProgramBody"

const AddProgramContainer = () => {

  return (

    <Row>
      <Col >
        <Card>
          <CardBody>
            <ProgramBody />
          </CardBody>
        </Card>
      </Col>
    </Row>
    
  )
};

export default AddProgramContainer;
