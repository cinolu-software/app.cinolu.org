import React from "react";
import { Col, Container, Row } from "reactstrap";
import { ProgramListHead } from "./ProgramListHead";
import ProgramListTabContent from "./ProgramListTabContent";

const ProgramOtherListContainer = () => {

    return (
        <Container fluid>
            <Row className="project-cards">
                <Col md="12" className="project-list">
                    <ProgramListHead />
                </Col>
                <Col sm="12">
                    <ProgramListTabContent />
                </Col>
            </Row>
        </Container>
    );
};

export default ProgramOtherListContainer;