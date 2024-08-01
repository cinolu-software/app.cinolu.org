import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ProductBody from "./ProductBody";

const AddProgramContainer = () => {

  return (
    <Row>
      <Col >
        <Card>
          <CardHeader>
            <h5>{"Formulaire d'ajout de programme"}</h5>
          </CardHeader>
          <CardBody>
            <ProductBody />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
};

export default AddProgramContainer;
