import React from 'react';
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import Body from "@/Components/Applications/programs/AddProgram/Body";

const AddProgramContainer = () => {
    return <Container fluid>
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        <h5>{'Ajout de Programme'}</h5>
                    </CardHeader>
                    <CardBody>
                        <Body />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default AddProgramContainer;