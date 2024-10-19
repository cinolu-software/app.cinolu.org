import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Link from "next/link";

const DetailProgramContainer = () => {
    return (
        <Container fluid>
            <Row className={'mb-4'}>
                <Col className={'d-flex justify-content-end'}>
                    <Link href={'/programs'} className={'btn btn-outline-primary'}>
                        <i className="bi bi-arrow-left"></i>
                        Retour
                    </Link>
                </Col>
            </Row>
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