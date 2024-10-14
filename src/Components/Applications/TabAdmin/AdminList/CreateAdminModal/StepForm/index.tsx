import React from 'react';
import {Card, CardBody, CardHeader,Col, Row} from "reactstrap";
import FormBody from "./FormBody";


const CreateUser = () => {

    return (
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <FormBody/>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default CreateUser;