import React from 'react';
import {Card, CardBody, CardHeader,Col, Row} from "reactstrap";
import FormBody from "./FormBody";


const CreateUser = () => {

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <h5>{"Formulaire de création d'un utilisateur"}</h5>
                    </CardHeader>
                    <CardBody>
                        <FormBody/>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default CreateUser;