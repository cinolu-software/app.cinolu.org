import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import BackButton from "@/CommonComponent/BackButton";

const DetailProgramContainer = () => {
    return (
        <Container fluid>
            <BackButton link={'/programs'} />
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <h5>{'Détail du Programme'}</h5>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailProgramContainer;