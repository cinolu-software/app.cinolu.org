import React from "react";
import {Col, Container, Row} from "reactstrap";
import NumberingWizard from "@/Components/Applications/programs/AddProgramNew/NumberingWizard";
import Link from "next/link";



const AddProgramNewContainer = () => {

    return (
        <Container fluid>
            <Row className={'mb-4'}>
                <Col className={'d-flex justify-content-end'}>
                    <Link href={'/programs/'} className={'btn btn-outline-primary'}>
                        <i className="bi bi-arrow-left"></i>
                        Retour
                    </Link>
                </Col>
            </Row>
            <Row>
                <NumberingWizard/>
            </Row>
        </Container>
    )
}

export default AddProgramNewContainer;